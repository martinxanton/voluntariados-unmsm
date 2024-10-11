export default function CardInfo({ title, description, imagePath }) {
    return (
      <>
        {/*<!-- Component: Card with image --> */}
        <div className="overflow-hidden text-center bg-white rounded shadow-md text-slate-500 shadow-slate-200 px-20">
          {/* <!-- Image --> */}
          <figure className="p-6 pb-0">
            <img
              src={imagePath} 
              alt={title} 
              className="w-40 h-40 mx-auto" 
            />
          </figure>
          {/* <!-- Body--> */}
          <div className="p-6">
            <div className="py-5 ">
                <span className="my-4 text-3xl font-bold text-slate-700">{title}</span>
            </div>
            <div className="mb-5">
                <span className="text-xl ">{description}</span>
            </div>
          </div>
        </div>
        {/*<!-- End Card with image --> */}
      </>
    );
  }
  