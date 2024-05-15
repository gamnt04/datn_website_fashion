import {
  FacebookIcon,
  InstagramIcon,
  YouTubeIcon,
  TikTokIcon,
  TwitterIcon,
} from "../Icon";
const Footer = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 ">
      <div>
        <h4>STARK.</h4>

        <p className="text-[#999999]">
          Address: Stark Funiture Store 4956 Polk Street, Arizona, United States
        </p>

        <ul>
          <li className="text-[#999999]">
            <a href="">Phone: 520-901-7672</a>
          </li>
        </ul>
        <ul>
          <li className="text-[#999999]">
            <a href="">Email: demo@demo.com</a>
          </li>
        </ul>
      </div>

      <div>
        <h4>About Us</h4>
        <ul>
          {" "}
          <li className="text-[#999999]">
            <a href="">Our Company</a>
          </li>
        </ul>
        <ul>
          <li className="text-[#999999]">
            <a href="">Contact Us</a>
          </li>
        </ul>
        <ul>
          <li className="text-[#999999]">
            <a href="">FAQs</a>
          </li>
        </ul>
        <ul>
          <li className="text-[#999999]">
            <a href="">Terms and conditions</a>
          </li>
        </ul>
      </div>

      <div>
        <h4>Information</h4>
        <ul>
          {" "}
          <li className="text-[#999999]">
            <a href="">Delivery</a>
          </li>
        </ul>
        <ul>
          <li className="text-[#999999]">
            <a href="">Search</a>
          </li>
        </ul>
        <ul>
          <li className="text-[#999999]">
            <a href="">Size Guide</a>
          </li>
        </ul>
        <ul>
          <li className="text-[#999999]">
            <a href="">Support</a>
          </li>
        </ul>
      </div>

      <div>
        <div>
          <h4>Newsletter</h4>
          <p className="text-[#999999]">
            Be the first to know about our new arrivals and exclusive offers.
          </p>
        </div>
        <div>
          <input type="email" placeholder="Email" />
          <button>Subscribe</button>
        </div>
        <div>
          <a href="">
            <FacebookIcon />
          </a>
          <a href="">
            <InstagramIcon />
          </a>
          <a href="">
            <YouTubeIcon />
          </a>
          <a href="">
            <TikTokIcon />
          </a>
          <a href="">
            <TwitterIcon />
          </a>
        </div>
      </div>
    </div>
  );
};
export default Footer;
