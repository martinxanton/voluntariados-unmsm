import CardInfo from "../components/CardInfo";
import CarouselTestimonial from "../components/CarouselTestimonial";
import CardStat from "../components/CardStat";


const LandingPage = () => {
    return (
<div>
<div className="carousel w-full">
  <div id="slide1" className="carousel-item relative w-full">
    <img
      src="src/assets/bannerLP.png"
      className="w-full" />
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide4" className="btn btn-circle">❮</a>
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div>
  <div id="slide2" className="carousel-item relative w-full">
    <img
      src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
      className="w-full" />
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide1" className="btn btn-circle">❮</a>
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div>
  <div id="slide3" className="carousel-item relative w-full">
    <img
      src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
      className="w-full" />
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide2" className="btn btn-circle">❮</a>
      <a href="#slide4" className="btn btn-circle">❯</a>
    </div>
  </div>
  <div id="slide4" className="carousel-item relative w-full">
    <img
      src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
      className="w-full" />
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide3" className="btn btn-circle">❮</a>
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div>
</div>


<div className="bg-base-200 min-h-60-screen flex justify-center pt-12 py-96">
  <div className="text-center">
    <div className="max-w-md">
      <h1 className="text-4xl font-bold">¿Cómo quieres ayudar?</h1>
      <div className="p-3 " >
        <div>
            <button className="btn ">QUIERO SER VOLUNTARIO</button>        
        </div>
        <div>
            <h1 className="">Elige la causa ideal para ti</h1>
        </div>
      </div>
    </div>
  </div>
</div>


<div className=" bg-base-200 min-h-56-screen py-36  flex justify-center ">
  <div className="hero-content flex-col lg:flex-row">
    <img
      src="src/assets/imageVolunteer.jpg"
      className="max-w-sm rounded-lg shadow-2xl" />
    <div className="py-8 mx-16">
      <h1 className="text-5xl font-bold">Únete !</h1>
      <p className="py-6 text-2xl">
        La comunidad solidaria universitaria más grande del Perú. A través de voluntarios de diversas areas, se busca ayudar a las personas que más lo necesitan.
      </p>

    </div>
  </div>
</div>





<div className="my-36">
    <div className="text-center my-12">
        <h1 className="text-4xl font-bold">¿Qué beneficios brinda la plataforma?</h1>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-12 my-6">

      {/* Card 1 */}
      <CardInfo
        title="Sencilla y Amigable"
        description="La plataforma es fácil de usar, rápida e intuitiva."
        imagePath="src/assets/beneficio1.svg"
      />
  {/* Card 2 */}
  <CardInfo
        title="Confiable"
        description="Los programas no tienen fines."
        imagePath="src/assets/beneficio2.svg"
      />

  {/* Card 3 */}
  <CardInfo
        title="Diversidad de causas"
        description="Tienes a tu disposición proyectos para participar."
        imagePath="src/assets/beneficio3.svg"
      />

  {/* Card 4 */}
  <CardInfo
        title="Continuidad"
        description="Damos seguimiento del proyecto para umentar la transparencia."
        imagePath="src/assets/beneficio4.svg"
      />
</div>
</div>



<div className="my-20">
    <div className="text-center my-12">
        <h1 className="text-4xl font-bold">Testimonios</h1>
    </div>
    <div>
    <CarouselTestimonial />
    </div>

</div>



<div >
    <div className="text-center my-12">
        <h1 className="text-4xl font-bold">Voluntariado en cifras</h1>
    </div>
    <div className=" flex justify-around">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mx-12 my-6">
    <CardStat
                title="Voluntarios registrados"
                value="+1.2K"
            />
            <CardStat
                title="Programas de voluntariado"
                value="+150"
            />
            <CardStat
                title="Horas de voluntariado"
                value="+1.2K"
            />
            <CardStat
                title="Personas beneficiadas"
                value="+2k"

            />
        </div>
    </div>
</div>





</div>
    );
};

export default LandingPage;