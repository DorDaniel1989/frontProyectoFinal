import React, { Fragment, PureComponent } from "react";
import Slider from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "../styles/carrusel.sass";

const responsive = {
    0: { items: 1 },
    820: { items: 2 },
    1220: { items: 3 },
    1624: { items: 4 }
};

class Carrusel extends PureComponent {
    state = {
        currentIndex: 0,
        itemsInSlide: 1,
        isPrevSlideDisabled: true,
        isNextSlideDisabled: true,
        galleryItems: this.props.children || [],
        rKey: Date.now()
    };

    slidePrevPage = () => {
        const { currentIndex, itemsInSlide } = this.state;
        let moveToIndex = currentIndex - itemsInSlide;
        if (moveToIndex < 0) moveToIndex = 0;
        this.setState((p) => ({ ...p, currentIndex: moveToIndex }));
    };

    slideNextPage = () => {
        const {
            itemsInSlide,
            galleryItems: { length }
        } = this.state;
        let moveToindex = this.state.currentIndex + itemsInSlide;
        if (moveToindex > length) moveToindex = itemsInSlide;
        console.log('el slide: ' + itemsInSlide);
        this.setState((p) => ({ ...p, currentIndex: moveToindex }));
    };

    handleOnSlideChange = (event) => {
        const {
            itemsInSlide,
            item,
            isNextSlideDisabled,
            isPrevSlideDisabled
        } = event;
        let isNextDisabled = isNextSlideDisabled;
        console.log(item);
        if (item + itemsInSlide >= this.state.galleryItems.length) {
            isNextDisabled = true;
        }
        this.setState((p) => ({
            ...p,
            itemsInSlide,
            currentIndex: item,
            isNextSlideDisabled: isNextDisabled,
            isPrevSlideDisabled
        }));
    };

    render() {
        const { currentIndex } = this.state;
        return (
            <Fragment>
                <Slider
                    // animationDuration={00}
                    activeIndex={this.state.currentIndex}
                    autoPlay 
                    autoPlayInterval="10000"
                    keysControlDisabled
                    startIndex={currentIndex}
                    onInitialized={this.handleOnSlideChange}
                    onSlideChanged={this.handleOnSlideChange}
                    onResized={this.handleOnSlideChange}
                    infinite={false}
                    responsive={responsive}
                    paddingLeft={40}
                    paddingRight={60}
                    disableDotsControls
                    disableButtonsControls
                    animationEasingFunction="ease-in-out"
                    swipeDelta={0}
                    swipeExtraPadding={0}
                    touchMoveDefaultEvents={false}
                >
                    {this.props.children}
                </Slider>
                <div className="controls">

                        <button className="btn-prev" onClick={this.slidePrevPage}>
                            Prev
                        </button>

                    <div className="flex-grow-1"></div>

                        <button className="btn-next" onClick={this.slideNextPage}>
                            Próx
                        </button>

                </div>
            </Fragment>
        );
    }
}

export default Carrusel;
