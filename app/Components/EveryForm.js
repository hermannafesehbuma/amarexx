import ButtonBig from './ButtonBig';

function EveryForm() {
  return (
    <div>
      <form className=" w-[70%] mx-auto">
        <h3 className="text-center text-3xl mt-20">
          Subscribe For Every Door <br />
          Direct Mail® Service
        </h3>
        <div className="w-[100%] flex justify-between mt-10">
          <input
            name="firstName"
            id="firstName"
            placeholder="First Name"
            className="w-[48%] rounded-sm p-2 focus:outline-none border border-primary"
          ></input>
          <input
            name="lastName"
            id="lastName  "
            placeholder="Last Name"
            className="w-[48%] rounded-sm p-2 focus:outline-none border border-primary "
          ></input>
        </div>
        <div className="w-[100%] flex justify-between mt-10">
          <input
            name="email"
            id="email"
            placeholder="Email"
            className="w-[48%] rounded-sm p-2 focus:outline-none border border-primary"
          ></input>
          <input
            name="phone"
            id="phone"
            placeholder="Phone Number"
            className="w-[48%] rounded-sm p-2 focus:outline-none border border-primary"
          ></input>
        </div>
        <div className="w-[100%] flex justify-between mt-10">
          <input
            name="packagename"
            id="packagename"
            placeholder="Package Name"
            className="w-[48%] rounded-sm p-2 focus:outline-none border border-primary"
          ></input>
          <select
            name="packageType"
            id="packageType"
            className=" w-[48%] rounded-sm p-2 focus:outline-none border border-primary"
          >
            <option value="standard">Standard Packages</option>
            <option value="specialized">Specialized Options</option>
            <option value="freight">Freight Packaging</option>
            <option value="customized">Customized Packaging</option>
          </select>
        </div>

        <div className="mt-10">
          <ButtonBig className="px-10 py-3 bg-accent rounded-full flex items-center ">
            Submit
          </ButtonBig>
        </div>
      </form>{' '}
    </div>
  );
}

export default EveryForm;
