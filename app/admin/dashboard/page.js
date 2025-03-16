import {
  fetchAllItemTypes,
  fetchAllShipmentsforUpdate,
  fetchAllShippingTypes,
  fetchAllStatus,
  fetchAllTransitTimmes,
  fetchAllUsers,
} from '@/app/api/supabaseapi';
import ShipmentTable from '../Components/ShipmentTable';
import { revalidatePath } from 'next/cache';
async function Page() {
  const { data, error } = await fetchAllShipmentsforUpdate();
  const { data: users, error: usersError } = await fetchAllUsers();
  const { transittimes, error: transitError } = await fetchAllTransitTimmes();
  const { packagetype, error: packageError } = await fetchAllItemTypes();
  const { statuses, error: statusError } = await fetchAllStatus();
  const { shippingtype, error: shippingError } = await fetchAllShippingTypes();
  if (error) error.message = 'Error Occured While Trying to  Fetch Data';

  return (
    <>
      <div>
        <h1 className="md:text-4xl xs:text-2xl">Welcome, Admin</h1>
      </div>
      <div className="bg-white mt-10 p-10 shadow text-sm">
        <ShipmentTable
          error={error}
          data={data}
          users={users}
          transittimes={transittimes}
          transitError={transitError}
          allPackageType={packagetype}
          packageError={packageError}
          statuses={statuses}
          statusError={statusError}
          shippingError={shippingError}
          shippingtype={shippingtype}
        />
      </div>
    </>
  );
}

export default Page;
