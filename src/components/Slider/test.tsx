import 'match-media-mock'
import { render, screen } from 'utils/test-utils'

import Slider from '.'

describe('<Slider />', () => {
  it('should render children as slider item', () => {
    const { container } = render(
      <Slider settings={{ slidesToShow: 1, infinite: false }}>
        <p>Item 1</p>
        <p>Item 2</p>
      </Slider>
    )

    expect(
      screen.getByText(/Item 1/i).parentElement?.parentElement
    ).toHaveClass('slick-slide')
    expect(
      screen.getByText(/Item 2/i).parentElement?.parentElement
    ).toHaveClass('slick-slide')

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 .slick-slider {
        position: relative;
        display: block;
        box-sizing: border-box;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-touch-callout: none;
        -khtml-user-select: none;
        -ms-touch-action: pan-y;
        touch-action: pan-y;
        -webkit-tap-highlight-color: transparent;
      }

      .c0 .slick-list {
        position: relative;
        display: block;
        overflow: hidden;
        margin: 0;
        padding: 0;
      }

      .c0 .slick-list:focus {
        outline: none;
      }

      .c0 .slick-list.dragging {
        cursor: pointer;
        cursor: hand;
      }

      .c0 .slick-slider .slick-track,
      .c0 .slick-slider .slick-list {
        -webkit-transform: translate3d(0,0,0);
        -moz-transform: translate3d(0,0,0);
        -ms-transform: translate3d(0,0,0);
        -o-transform: translate3d(0,0,0);
        -webkit-transform: translate3d(0,0,0);
        -ms-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
      }

      .c0 .slick-track {
        position: relative;
        top: 0;
        left: 0;
        display: block;
      }

      .c0 .slick-track:before,
      .c0 .slick-track:after {
        display: table;
        content: '';
      }

      .c0 .slick-track:after {
        clear: both;
      }

      .c0 .slick-loading .slick-track {
        visibility: hidden;
      }

      .c0 .slick-slide {
        display: none;
        float: left;
        height: 100%;
        min-height: 1px;
      }

      .c0 [dir='rtl'] .slick-slide {
        float: right;
      }

      .c0 .slick-slide img {
        display: block;
      }

      .c0 .slick-slide.slick-loading img {
        display: none;
      }

      .c0 .slick-slide.dragging img {
        pointer-events: none;
      }

      .c0 .slick-initialized .slick-slide {
        display: block;
      }

      .c0 .slick-loading .slick-slide {
        visibility: hidden;
      }

      .c0 .slick-vertical .slick-slide {
        display: block;
        height: auto;
        border: 1px solid transparent;
      }

      .c0 .slick-arrow.slick-hidden {
        display: none;
      }

      <section
        class="c0"
      >
        <div
          class="slick-slider slick-initialized"
          dir="ltr"
        >
          <button
            class="slick-arrow slick-prev slick-disabled"
            data-role="none"
            style="display: block;"
            type="button"
          >
             
            Previous
          </button>
          <div
            class="slick-list"
          >
            <div
              class="slick-track"
              style="opacity: 1; transform: translate3d(0px, 0px, 0px);"
            >
              <div
                aria-hidden="false"
                class="slick-slide slick-active slick-current"
                data-index="0"
                style="outline: none; width: 0px;"
                tabindex="-1"
              >
                <div>
                  <p
                    style="width: 100%; display: inline-block;"
                    tabindex="-1"
                  >
                    Item 1
                  </p>
                </div>
              </div>
              <div
                aria-hidden="true"
                class="slick-slide"
                data-index="1"
                style="outline: none; width: 0px;"
                tabindex="-1"
              >
                <div>
                  <p
                    style="width: 100%; display: inline-block;"
                    tabindex="-1"
                  >
                    Item 2
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button
            class="slick-arrow slick-next"
            data-role="none"
            style="display: block;"
            type="button"
          >
             
            Next
          </button>
        </div>
      </section>
    `)
  })
})
