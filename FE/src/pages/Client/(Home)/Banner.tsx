import { Carousel } from "antd"

const Banner = () => {
  const contentStyle: React.CSSProperties = {
    height: '650px',
    color: '#fff',
    lineHeight: '700px',
    textAlign: 'center',
    background: '#364d79',
  };
  return (
    <>
      <Carousel autoplay arrows draggable>
        <div>
          <img src="../../src/assets/Images/Products/banner-1.jpg" className="w-full h-full" alt="" style={contentStyle} />
        </div>
        <div>
          <img src="../../src/assets/Images/Products/banner-2.jpg" className="w-full h-full" alt="" style={contentStyle} />
        </div>
        <div>
          <img src="../../src/assets/Images/Products/banner-3.jpg" className="w-full h-full" alt="" style={contentStyle} />
        </div>
        <div>
          <img src="../../src/assets/Images/Products/banner-4.png" className="w-full h-full" alt="" style={contentStyle} />
        </div>
      </Carousel>

    </>)
}

export default Banner