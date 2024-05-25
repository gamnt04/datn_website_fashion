const Contact = () => {
  return (
    <div className="">
      <div className="bg-[#f5f5f5]">
        <div className="flex gap-5  h-[109px] items-center max-w-[1200px] mx-auto">
          <p className="text-[#999999] underline">Home</p>
          <p>/</p>
          <p>Contact</p>
        </div>
      </div>
      <div className="  max-w-[1200px] mx-auto  grid grid-cols-1 gap-4 my-10 sm:grid-cols-2 md:grid-cols-2">
        <div>
          <h2 className="text-xl text-[#222222] font-semibold">
            Stay in touch! Contact us
          </h2>
          <p className="text-sm text-[#999999] mt-5">
            Minimalist styling is not about creating a cold, hard, empty white
            box of a home. It is about using simple and natural forms, and
            taking away layers without losing the aesthetic appeal of the space.
          </p>
          <input
            className="w-[584px] h-[45px] mt-4 border border-[#999999] rounded-md pl-4"
            type="text"
            placeholder="Name"
            required
          />

          <input
            className="w-[584px] h-[45px] mt-4 border border-[#999999] rounded-md pl-4"
            type="email"
            placeholder="Email*"
            required
          />
          <input
            className="w-[584px] h-[45px] mt-4 border border-[#999999] rounded-md pl-4"
            type="text"
            placeholder="Phone number"
          />
          <input
            className="w-[584px] h-[45px] mt-4 border border-[#999999] rounded-md pl-4 pb-24 pt-7"
            type="text"
            placeholder="Comment"
          />
          <button className="w-[584px] h-[45px] bg-black text-white mt-4 rounded-md text-sm hover:bg-[#f68e56]">
            Send
          </button>
        </div>

        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d717.0503634761782!2d105.73999147053436!3d21.053666594456768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454f9ec100009%3A0x784cd6eb9706cb3d!2zTmcuIDYwIFAuIE5ndXnDqm4gWMOhLCBOZ3V5w6puIFjDoSwgTWluaCBLaGFpLCBC4bqvYyBU4burIExpw6ptLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1716068409544!5m2!1svi!2s"
            width="600"
            height="500"
            style={{ border: "0" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          ></iframe>
        </div>
      </div>

      <div className=" container mx-auto max-w-[1200px]  text-center mt-16">
        <h2 className="text-[48px] font-normal pb-[15px]">Get in touch</h2>
        <p className="text-[18px] text-[#ABABAB] pb-[30px]">
          Subcrible for latest stories and promotions (35% save)
        </p>
        <div className="pb-[30px]">
          <input
            type="text"
            name=""
            id=""
            placeholder="Email"
            className="w-[640px] h-[46px] border-2 pl-[20px] "
          />
          <button className="btn-submit ml-[20px] w-[122px] h-[46px] bg-[#1C1C1C] text-white">
            Subscribe
          </button>
        </div>
        <div className="">
          <ul className="flex justify-center space-x-5">
            <li className="link_icon px-4 py-4 border-2 border-[#ABABAB] rounded-full flex items-center justify-center">
              <a href="" className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ABABAB"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-facebook"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </li>
            <li className="link_icon px-4 py-4 border-2 border-[#ABABAB] rounded-full flex items-center justify-center">
              <a href="" className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ABABAB"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-youtube"
                >
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <path d="m10 15 5-3-5-3z" />
                </svg>
              </a>
            </li>
            <li className="link_icon px-4 py-4 border-2 border-[#ABABAB] rounded-full flex items-center justify-center">
              <a href="" className="flex items-center justify-center icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ABABAB"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </li>
            <li className="link_icon px-4 py-4 border-2 border-[#ABABAB] rounded-full flex items-center justify-center">
              <a href="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ABABAB"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-twitter"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <div className="py-[30px]">
          <p className="text-[#ABABAB]">Don’t worry. We won't spam.</p>
        </div>
        <hr className="my-10" />
      </div>
    </div>
  );
};

export default Contact;
