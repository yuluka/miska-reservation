const ThankYouPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            <div className="text-red-500 text-6xl mb-4">❤️</div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
                ¡Reserva confirmada!
            </h1>
            <p className="text-muted-foreground text-lg max-w-md">
                Gracias por apoyar nuestro proyecto MISKA. Has contribuido a
                nuestra formación académica.
            </p>
        </div>
    );
};

export default ThankYouPage;
