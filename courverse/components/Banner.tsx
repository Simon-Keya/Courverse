export default function Banner() {
    return (
      <section className="bg-gradient-to-r from-blue-500 to-teal-500 text-white text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Welcome to Courverse</h1>
        <p className="text-xl">Your gateway to knowledge and growth</p>
        <div className="mt-6">
          <a href="/courses" className="btn btn-primary">
            Explore Courses
          </a>
        </div>
      </section>
    );
  }
  