export default function HomeJumbotron() {
    return (
        <section className="bg-white mb-10 mt-48">
            <div className="py-2 px-4 mx-auto max-w-screen-xl text-center lg:py-4">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl ">Welcome to my lidl tools application</h1>
                <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48">Here you will be able to find many tools for daily appliances. We hope you enjoy your stay.</p>
                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                    <label className="swap swap-flip text-9xl">
                        <input type="checkbox" className="hidden"/>
                        <div className="swap-on">😊</div>
                        <div className="swap-off">😇</div>
                    </label>
                </div>
            </div>
        </section>
    );
}