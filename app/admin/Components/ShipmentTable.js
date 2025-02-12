'use client';
import ErrorBox from '@/app/dashboard/Components/ErrorBox';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import UpdateShipmentMenu from './UpdateShipmentMenu';
import { useState } from 'react';
import { deleteShipment } from '@/app/api/supabaseapi';
import MessageLog from './MessageLog';
import { MdEditDocument } from 'react-icons/md';
import EditStatusForm from './EditStatusForm';
function ShipmentTable({
  error,
  data,
  users,
  transittimes,
  transitError,
  allPackageType,
  packageError,
  statuses,
  statusError,
  shippingError,
  shippingtype,
}) {
  const [editMenuOpen, setEditMenuOpen] = useState(false);
  const [editStatusOpen, setStatusMenuOpen] = useState(false);
  const [activeShipment, setActiveShipment] = useState('null');
  const [errMessage, setErrMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  function handleDeleteUser(shipmentId) {
    const error = deleteShipment(shipmentId);
    if (error) {
      setErrMessage('This Shipment Failed to Delete, Try Again');
    } else {
      setErrMessage('Shipment has been deleted Succesfully');
    }
  }

  function handleEditShipment(shipment) {
    const { shipment_id: shipmentId } = shipment; // Destructure shipmentId from the shipment object object
    setEditMenuOpen(true);
    setActiveShipment(shipment);
  }

  function handleEditStatus(shipment) {
    const { shipment_id: shipmentId } = shipment; // Destructure shipmentId from the shipment object object
    setStatusMenuOpen(true);
    setActiveShipment(shipment);
  }

  return (
    <>
      {errMessage ? (
        <MessageLog
          message={errMessage}
          setMessage={setErrMessage}
          value={false}
        />
      ) : (
        <MessageLog
          message={successMessage}
          setMessage={setSuccessMessage}
          value={true}
        />
      )}
      {editMenuOpen ? (
        <UpdateShipmentMenu
          editMenuOpen={editMenuOpen}
          setEditMenuOpen={setEditMenuOpen}
          activeShipment={activeShipment}
          data={data}
          users={users}
          transittimes={transittimes}
          transitError={transitError}
          allPackageType={allPackageType}
          packageError={packageError}
          statuses={statuses}
          statusError={statusError}
          shippingtype={shippingtype}
          shippingError={shippingError}
        />
      ) : (
        ''
      )}
      {editStatusOpen ? (
        <EditStatusForm
          editStatusOpen={editStatusOpen}
          setStatusMenuOpen={setStatusMenuOpen}
          activeShipment={activeShipment}
          data={data}
          users={users}
          transittimes={transittimes}
          transitError={transitError}
          allPackageType={allPackageType}
          packageError={packageError}
          statuses={statuses}
          statusError={statusError}
          shippingtype={shippingtype}
          shippingError={shippingError}
        />
      ) : (
        ''
      )}
      <div className="w-full overflow-x-auto">
        <table className="w-[100%] overflow-x-scroll">
          <thead>
            <tr className=" ">
              <th className="text-left pb-5 border-b border-primary">
                Tracking Number
              </th>
              <th className="text-left pb-5 border-b border-primary">
                Shipper&apos;s Name
              </th>
              <th className="text-left pb-5 border-b border-primary">
                Receiver&apos;s Name
              </th>
              <th className="text-left pb-5 border-b border-primary">
                Package Type
              </th>
              <th className="text-left pb-5 border-b border-primary">Status</th>
              <th className="text-left pb-5 border-b border-primary">Action</th>
              <th className="text-left pb-5 border-b border-primary">Delete</th>
            </tr>
          </thead>
          <tbody>
            {error ? (
              <ErrorBox message={error.message} />
            ) : (
              data.map((shipment) => (
                <tr key={shipment.trackingNumber}>
                  <td className="text-left font-bold text-blue-500 py-5 border-b">
                    {shipment.trackingNumber}
                  </td>
                  <td className="text-left py-5 border-b">
                    {shipment.shipper.name}
                  </td>
                  <td className="text-left py-5 border-b">
                    {shipment.receiver.name}
                  </td>
                  <td className="text-left py-5 border-b">
                    {shipment.package_type.type}
                  </td>
                  <td
                    className={`text-left ${
                      shipment.status_id.status === 'In Transit'
                        ? 'text-green-600'
                        : 'text-orange-400'
                    } py-5 border-b`}
                  >
                    {shipment.status_id.status}
                  </td>
                  <td className="py-5 border-b">
                    <FaEdit
                      className="text-green-600 cursor-pointer"
                      onClick={() => handleEditShipment(shipment)}
                    />
                    <MdEditDocument
                      className="text-green-600 cursor-pointer"
                      onClick={() => handleEditStatus(shipment)}
                    />
                  </td>
                  <td className="py-5 border-b">
                    <MdDelete
                      className="text-red-600 cursor-pointer"
                      onClick={() => handleDeleteUser(shipment.shipment_id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ShipmentTable;
