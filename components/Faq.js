const Contact = () => {
  return (
    <div className="flex-1" id="faq">
      <div className="hero bg-base-300 md:min-h-screen rounded-3xl">
        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold text-center md:text-left text-primary">
            Frequently asked questions
          </h1>
          <p className="py-6 md:w-[85%] md:text-lg">
            Everything you need to know before getting started.
          </p>

          <div className="flex flex-col gap-2">
            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
              <input type="radio" name="my-accordion-2" defaultChecked />
              <div className="collapse-title font-semibold">
                Is Lynko free to use?
              </div>
              <div className="collapse-content text-sm">
                Yes. Lynko is free to use for personal projects and
                experimentation.
              </div>
            </div>
            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title font-semibold">
                Do I need to create an account?
              </div>
              <div className="collapse-content text-sm">
                Yes, creating an account lets you manage your links and
                customize your page.
              </div>
            </div>
            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title font-semibold">
                Can I edit my links later?
              </div>
              <div className="collapse-content text-sm">
                Absolutely. You can add, edit, or remove links anytime from your
                dashboard.
              </div>
            </div>
            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title font-semibold">
                Is this an official product?
              </div>
              <div className="collapse-content text-sm">
                No. Lynko is a learning project built to explore modern web
                technologies.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
