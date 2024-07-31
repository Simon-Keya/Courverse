
const Contact = () => {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm w-full"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm w-full"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm w-full"
              rows={4}
              placeholder="Enter your message"
            ></textarea>
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
