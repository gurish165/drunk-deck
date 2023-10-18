function Banner({ bottom }) {
    const outerSectionStyles = bottom ? {
        position: 'absolute',
        bottom: '0px'
    } : {};

    return (
        <section class="banner-outer-section" style={outerSectionStyles}>
            <div class="banner-wrapper-div">
                <section class="banner-message">
                    Pookie Play is designed to get you f*cked up with your friends! Choose your players, a basic penalty, and a maximum penalty. Good luck and keep some Liquid IV on hand 😘
                </section>
            </div>
        </section>
    );
}

export default Banner;
