import {
  fetchAllItemTypes,
  fetchAllTransitTimmes,
  fetchAllUsers,
} from '@/app/api/supabaseapi';
import CreateShipmentForm from '../../Components/CreateShipmentForm';

async function page() {
  const { data, error } = await fetchAllUsers();
  const { transittimes, error: transitError } = await fetchAllTransitTimmes();
  const { packagetype, error: packageError } = await fetchAllItemTypes();
  return (
    <div>
      <h3 className="text-4xl xs:text-center md:text-left">
        Create New Shipment
      </h3>
      <CreateShipmentForm
        data={data}
        error={error}
        transittimes={transittimes}
        transitError={transitError}
        allPackageType={packagetype}
        packageError={packageError}
      />
    </div>
  );
}

export default page;
