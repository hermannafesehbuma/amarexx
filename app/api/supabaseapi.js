'use server';
import { revalidatePath } from 'next/cache';
import { supabase } from '../supabaseClient';
export const fetchShipmentByTrackingNumber = async (trackingNumber) => {
  const error = {};
  const { data, error: err } = await supabase
    .from('shipments')
    .select(
      `*, status_id(status), shipment_pet_id(name, breed, age, weight, petNumber), transit_times_id(transitTimes), shipper(name, email, phone_number, address), receiver(name, email, phone_number, address), shipment_good_id(weight, dimensions,  item_name, Item_number), package_type(type)`
    ) // Select all columns from shipments and 'status' from statuses table
    .eq('trackingNumber', trackingNumber) // Filter by the shipment ID
    .single();

  if (err) {
    error.message = 'Your Shipment has Not Loaded Correctly';
  }
  return { data, error };
};

export const fetchAllShipments = async () => {
  let { data, error } = await supabase
    .from('shipments')
    .select(
      '*, status_id(status), shipper(name), receiver(name), package_type(type)'
    );
  return { data, error };
};
export const fetchAllShipmentsforUpdate = async () => {
  let { data, error } = await supabase
    .from('shipments')
    .select(
      '*, status_id(status, status_id), shipment_good_id(goods_id, weight, dimensions, Item_number, item_name), shipper(name, user_id), receiver(name, user_id), package_type(type, item_id), shipment_pet_id(name, breed, age, weight, petNumber, pet_id)'
    );
  return { data, error };
};

export const createNewShipment = async (data) => {
  console.log(data);
  try {
    let relatedItemId = null; // ID of the inserted pet or good
    let relatedItemType = ''; // To indicate whether it's a pet or a good

    // Step 1: Insert into `pets` or `goods` table
    if (data.petName) {
      const { data: petData, error: petError } = await supabase
        .from('pets')
        .insert([
          {
            name: data.petName,
            breed: data.petBreed,
            age: data.petAge,
            weight: data.petWeight,
            petNumber: data.petNumber,
          },
        ])
        .select('pet_id')
        .single();

      if (petError)
        throw new Error(`Failed to insert pet: ${petError.message}`);

      relatedItemId = petData?.pet_id;
      relatedItemType = 'pet';
    } else if (data.itemName) {
      const { data: goodData, error: goodError } = await supabase
        .from('goods')
        .insert([
          {
            item_name: data.itemName,
            dimensions: data.itemDimension,
            item_id: data.packageType,
            weight: data.itemWeight,
            item_number: data.itemNumber, // Ensure correct lowercase naming
          },
        ])
        .select('goods_id')
        .single();

      if (goodError)
        throw new Error(`Failed to insert good: ${goodError.message}`);

      relatedItemId = goodData?.goods_id;
      relatedItemType = 'good';
    } else {
      throw new Error(
        'No valid item data (pet or good) provided for insertion.'
      );
    }

    // Step 2: Insert into `shipments` table
    const { data: shipmentData, error: shipmentError } = await supabase
      .from('shipments')
      .insert([
        {
          trackingNumber: data.trackingNumber,
          shipping_type_id: data.shipmentType,
          origin_street_address: data.originAddress,
          origin_state: data.origin_state_province_region,
          origin_city: data.originCity,
          origin_postal_code: data.originPostalCode,
          origin_country: data.originSelectedCountry,
          destination_street_address: data.destinationAddress,
          destination_state: data.destination_state_province_region,
          destination_city: data.destinationCity,
          destination_postal_code: data.destinationPostalCode,
          destination_country: data.destinationSelectedCountry,
          status_id: data.packageStatus,
          package_type: data.packageType,
          depatureTime: data.depatureTime,
          pickupTime: data.pickupTime,
          expectedDeliveryDate: data.deliveryDate,
          depatureDate: data.depatureDate,
          pickupDate: data.pickupDate,
          shipper: data.sender,
          receiver: data.receiver,
          totalFreight: data.totalFreight,
          transit_times_id: data.transitTimes,
          percentage: data.percentage,
          shipment_pet_id: relatedItemType === 'pet' ? relatedItemId : null,
          shipment_good_id: relatedItemType === 'good' ? relatedItemId : null,
          intermediate_path1: data.intermediatePath1 ?? null, // Use null if undefined
          intermediate_path2: data.intermediatePath2 ?? null, // Use null if undefined
        },
      ])
      .select()
      .single();

    if (shipmentError) {
      console.error('Error occurred while creating shipment:', shipmentError);
      throw new Error(`Failed to insert shipment: ${shipmentError.message}`);
    }

    return { relatedItemId, relatedItemType, shipmentData }; // Return shipment info
  } catch (error) {
    console.error('Error creating shipment:', error.message);
    throw error; // Rethrow the error for higher-level handling
  }
};

export const fetchAllUsers = async () => {
  let { data, error } = await supabase.from('users').select('*');
  return { data, error };
};

export const addNewUser = async (data) => {
  const { data: responseData, error } = await supabase
    .from('users')
    .insert([
      {
        name: data.name,
        email: data.email,
        phone_number: data.phone,
        address: data.address,
      },
    ])
    .select();
  return true;
};

export const deleteUser = async (userId) => {
  console.log(userId);
  const { error } = await supabase.from('users').delete().eq('user_id', userId);
  if (!error) {
    revalidatePath('/dashboard/users'); // 🔄 Revalidate the Users page
  }
  return error; // Return error instead of throwing it
};

export const updateUser = async (userId, updatedFields) => {
  const { data, error } = await supabase
    .from('users')
    .update(updatedFields) // Use updated fields
    .eq('user_id', userId)
    .select();
  if (!error) {
    revalidatePath('/dashboard/users'); // 🔄 Revalidate the Users page
  }
  return { data, error };
};

export const fetchAllStatus = async () => {
  let { data: statuses, error } = await supabase.from('statuses').select('*');
  return { statuses, error };
};

export const fetchAllTransitTimmes = async () => {
  let { data: transittimes, error } = await supabase
    .from('transittimes')
    .select('*');
  return { transittimes, error };
};

export const fetchAllItemTypes = async () => {
  let { data: packagetype, error } = await supabase
    .from('packagetype')
    .select('*');
  return { packagetype, error };
};

export const fetchAllShippingTypes = async () => {
  let { data: shippingtype, error } = await supabase
    .from('shippingtypes')
    .select('*');
  return { shippingtype, error };
};

export const updateShipment = async (shipmentId, updatedFields) => {
  console.log(updatedFields);
  const { data: formdata, formerror } = await supabase
    .from('shipments') // Replace 'shipments' with your table name
    .update(updatedFields) // `updatedformData` is an object containing the fields to update
    .eq('shipment_id', shipmentId); // Match the record by a specific field, e.g., 'id'
  return { formdata, formerror };
};

export const updatePet = async (petId, updatedFields) => {
  console.log(updatedFields);
  const { data: petdata, error: peterror } = await supabase
    .from('pets')
    .update(updatedFields)
    .eq('pet_id', petId)
    .select();
  return { petdata, peterror };
};

export const updateGoods = async (goodId, updatedFields) => {
  console.log(updatedFields);
  const { data: gooddata, error: gooderror } = await supabase
    .from('goods')
    .update(updatedFields)
    .eq('goods_id', goodId)
    .select();
  return { gooddata, gooderror };
};

export const deleteShipment = async (shipmentId) => {
  console.log(shipmentId);
  const { error } = await supabase
    .from('shipments')
    .delete()
    .eq('shipment_id', shipmentId);
  if (!error) {
    revalidatePath('/dashboard'); // 🔄 Revalidate the Users page
  }
  return error;
};

export const updateShipmentLocation = async (shipmentId, newLocation) => {
  const { data, error } = await supabase
    .from('shipments') // ✅ Table name
    .update({ present_address: newLocation }) // ✅ Column update
    .eq('shipment_id', shipmentId); // ✅ Find by tracking number

  if (error) {
    console.error('Error updating location:', error.message);
    return null;
  }

  console.log('Location updated successfully:', data);
  return data;
};

export const fetchActivity = async (trackingNumber) => {
  const { data: activity, error } = await supabase
    .from('activity')
    .select('*, status(status)')
    .eq('trackingNumber', trackingNumber)
    .order('time', { ascending: false }) // Sorts by time (newest first)
    .throwOnError(); // Ensure it throws errors

  if (error) {
    console.error('Error fetching activities:', error);
    return null;
  }

  console.log('Fetched Activities:', activity); // Log the fetched data
  return activity; // Returns an array of rows
};

export const updateStatusShipment = async (shipmentId, updatedFields) => {
  console.log(updatedFields);
  const { data: formdata, formerror } = await supabase
    .from('shipments') // Replace 'shipments' with your table name
    .update(updatedFields) // `updatedformData` is an object containing the fields to update
    .eq('shipment_id', shipmentId); // Match the record by a specific field, e.g., 'id'
  return { formdata, formerror };
};

export const createNewActivity = async (activityData) => {
  const { data: dataActivity, error } = await supabase.from('activity').insert([
    {
      trackingNumber: activityData.trackingNumber,
      status: activityData.packageStatus,
      present_address: activityData.presentAddress,
      time: activityData.time,
    },
  ]);

  if (error) {
    console.error('Error inserting activity:', error);
    return { error };
  }

  return { dataActivity };
};

export const fetchUser = async (email) => {
  const error = {};
  const { data, error: err } = await supabase
    .from('users')
    .select(`*`) // Select all columns from shipments and 'status' from statuses table
    .eq('email', email) // Filter by the shipment ID
    .single();

  if (err) {
    error.message = 'Your Email has Not Loaded Correctly';
  }
  return { data, error };
};

export const fetchShipmentByEmail = async (receiver) => {
  const error = {};
  const { data: shipmentData, error: err } = await supabase
    .from('shipments')
    .select(
      `*, status_id(status), shipment_pet_id(name, breed, age, weight, petNumber), transit_times_id(transitTimes), shipper(name, email, phone_number, address), receiver(name, email, phone_number, address), shipment_good_id(weight, dimensions,  item_name, Item_number), package_type(type)`
    ) // Select all columns from shipments and 'status' from statuses table
    .eq('receiver', receiver) // Filter by the shipment ID
    .single();

  if (err) {
    error.message = 'Your Shipment has Not Loaded Correctly';
  }
  return { shipmentData, error };
};

export const fetchRefundsById = async (receiver) => {
  const { data: refundsData, error } = await supabase
    .from('refunds')
    .select('*')
    .eq('user_id', receiver);
  console.log(refundsData);
  return { refundsData, error };
};

export const fetchRefunds = async () => {
  let { data: refunds, error } = await supabase
    .from('refunds')
    .select('*, user_id(name, email, user_id)');
  return { refunds, error };
};

export const deleteRefunds = async (id) => {
  const { error } = await supabase.from('refunds').delete().eq('id', id);
  return error;
};

export const createRefund = async (data) => {
  const { data: result, error } = await supabase
    .from('refunds')
    .insert([
      {
        user_id: data.user,
        purpose: data.purpose,
        amount_paid: data.amount_paid,
        refundable_amount: data.refundable_amount,
      },
    ])
    .select();
  return result;
};

export async function getCurrentUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
  console.log(session);
}

export async function resetPassword(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { success: true, message: 'Password reset link sent!' };
}

export async function fetchTrackingNumber(shipmentId) {
  const { data: shipmentData, error: shipmentError } = await supabase
    .from('shipments')
    .select(
      'shipper(email), receiver(email), trackingNumber, status_id(status)'
    )
    .eq('shipment_id', shipmentId)
    .single();

  return { shipmentData, shipmentError };
}

export async function fetchForSMS(shipmentId) {
  const { data: smsData, error: smsError } = await supabase
    .from('shipments')
    .select('receiver(name, phone_number), trackingNumber, status_id(status)')
    .eq('shipment_id', shipmentId)
    .single();

  return { smsData, smsError };
}
