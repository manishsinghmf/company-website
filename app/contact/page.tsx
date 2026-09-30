export default function ContactPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Get in touch
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Contact Us
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Have a question, project idea, or business requirement? Get in
              touch with our team and we&apos;ll get back to you.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Let&apos;s talk
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Tell us how we can help
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
              Whether you&apos;re starting a new project or looking to improve
              an existing product, share some details with us.
            </p>

            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-950">
                  Email
                </h3>

                <p className="mt-1 text-sm text-slate-600">
                  hello@vimatech.com
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-950">
                  Response time
                </h3>

                <p className="mt-1 text-sm text-slate-600">
                  We&apos;ll get back to you as soon as possible.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-slate-900"
                >
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-900"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-slate-900"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="mt-2 block w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}