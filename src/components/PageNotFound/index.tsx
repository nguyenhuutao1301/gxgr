import Link from "next/link";
function PageNotFond() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-4xl text-center">
            <div
              className="h-[400px] bg-center bg-no-repeat bg-cover flex items-center justify-center"
              style={{
                backgroundImage:
                  "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)",
              }}
            >
              <h1 className="text-[80px] font-bold">404</h1>
            </div>

            <div className="mt-[-50px]">
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                Trang Không Tồn Tại
              </h3>
              <p className="text-gray-700 mb-6">
                trang bạn truy cập không còn tồn tại hoặc đã bị xóa !!!
              </p>

              <Link
                href="/"
                className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
              >
                Về Trang Chủ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageNotFond;
