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
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>

    </>)
}

export default Banner