// ---- ---- Preloader ---- ---- //
window.onload = function () {
  document.querySelector('.preloader').classList.add('preloader-remove');
};
// ---- ---- Menu BTN on Click ---- ---- //
const btnMenu = document.querySelector('.menu-btn');

btnMenu.addEventListener('click', () => {
  btnMenu.classList.toggle('menu-btn--active');
});
const hearts = document.querySelector('.footer__made');
const heart = document.querySelector('.footer__heart');

hearts.addEventListener('click', () => {
  heart.classList.toggle('footer__heart--active');
});
// ---- ---- JQuery ---- ---- //
$(function () {
  // ---- ---- Slick Slider ---- ---- //
  $('.project__box').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    dots: true,
    prevArrow:
      '<svg width="25" height="21" viewBox="0 0 25 21" fill="black" xmlns="http://www.w3.org/2000/svg" class="slick-arrow slick-arrow__left"><path d="M8.77789 0.562669L0.564298 8.71345C-0.188099 9.46459 -0.188099 10.6838 0.564298 11.4324L8.77789 19.5881C9.5366 20.3392 10.7646 20.3354 11.5233 19.5881C12.2744 18.8357 12.2744 17.6215 11.5233 16.8691L6.71818 12.1016H22.1324C23.2459 12.1016 24.1467 11.202 24.1467 10.0885C24.1467 8.97625 23.2459 8.07537 22.1324 8.07537H6.68919L11.5233 3.28282C12.2744 2.53168 12.2744 1.31623 11.5233 0.565085C10.7658 -0.187313 9.53783 -0.188569 8.77789 0.562568V0.562669Z"  /></svg>',
    nextArrow:
      '<svg width="25" height="21" viewBox="0 0 25 21" fill="black" xmlns="http://www.w3.org/2000/svg" class="slick-arrow slick-arrow__right"><path d="M15.3688 19.5874L23.5824 11.4366C24.3348 10.6854 24.3348 9.46621 23.5824 8.71758L15.3688 0.561968C14.6101 -0.189173 13.3821 -0.185405 12.6234 0.561968C11.8723 1.31437 11.8723 2.52856 12.6234 3.28096L17.4285 8.04838L2.01437 8.04838C0.900866 8.04838 -1.90735e-05 8.94801 -1.90735e-05 10.0615C-1.90735e-05 11.1738 0.900866 12.0747 2.01437 12.0747L17.4575 12.0747L12.6234 16.8672C11.8723 17.6183 11.8723 18.8338 12.6234 19.5849C13.3809 20.3373 14.6089 20.3386 15.3688 19.5875V19.5874Z" /> </svg>',
    adaptiveHeight: true,
  });

  // ---- ---- Fancy Box ---- ---- //
  $(document).ready(function () {
    $('a.fancy_image').fancybox({
      width: '1200px',
    });
  });

  // ---- ---- Scroll Smooth ---- ---- //
  $('.menu').on('click', 'a', function (event) {
    event.preventDefault();
    let id = $(this).attr('href'),
      top = $(id).offset().top;
    $('body,html').animate({ scrollTop: top }, 1200);
  });
});

// ---- ---- Cloud Tags ---- ---- //
class FibonacciSphere {
  #points;

  get points() {
    return this.#points;
  }

  constructor(N) {
    this.#points = [];

    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const radius = Math.sqrt(1 - y ** 2);
      const a = goldenAngle * i;
      const x = Math.cos(a) * radius;
      const z = Math.sin(a) * radius;

      this.#points.push([x, y, z]);
    }
  }
}
class TagsCloud {
  #root;
  #size;
  #sphere;
  #tags;
  #rotationAxis;
  #rotationAngle;
  #rotationSpeed;
  #frameRequestId;

  constructor(root) {
    this.#root = root;
    this.#size = this.#root.offsetWidth;
    this.#tags = root.querySelectorAll('.tag');
    this.#sphere = new FibonacciSphere(this.#tags.length);
    this.#rotationAxis = [1, 0, 0];
    this.#rotationAngle = 0;
    this.#rotationSpeed = 0;

    this.#updatePositions();
    this.#initEventListeners();
    this.#root.classList.add('-loaded');
  }

  #initEventListeners() {
    window.addEventListener('resize', this.#updatePositions.bind(this));
    document.addEventListener('mousemove', this.#onMouseMove.bind(this));
  }

  #updatePositions() {
    const sin = Math.sin(this.#rotationAngle);
    const cos = Math.cos(this.#rotationAngle);
    const ux = this.#rotationAxis[0];
    const uy = this.#rotationAxis[1];
    const uz = this.#rotationAxis[2];

    const rotationMatrix = [
      [
        cos + ux ** 2 * (1 - cos),
        ux * uy * (1 - cos) - uz * sin,
        ux * uz * (1 - cos) + uy * sin,
      ],
      [
        uy * ux * (1 - cos) + uz * sin,
        cos + uy ** 2 * (1 - cos),
        uy * uz * (1 - cos) - ux * sin,
      ],
      [
        uz * ux * (1 - cos) - uy * sin,
        uz * uy * (1 - cos) + ux * sin,
        cos + uz ** 2 * (1 - cos),
      ],
    ];

    const N = this.#tags.length;

    for (let i = 0; i < N; i++) {
      const x = this.#sphere.points[i][0];
      const y = this.#sphere.points[i][1];
      const z = this.#sphere.points[i][2];

      const transformedX =
        rotationMatrix[0][0] * x +
        rotationMatrix[0][1] * y +
        rotationMatrix[0][2] * z;
      const transformedY =
        rotationMatrix[1][0] * x +
        rotationMatrix[1][1] * y +
        rotationMatrix[1][2] * z;
      const transformedZ =
        rotationMatrix[2][0] * x +
        rotationMatrix[2][1] * y +
        rotationMatrix[2][2] * z;

      const translateX = (this.#size * transformedX) / 2;
      const translateY = (this.#size * transformedY) / 2;
      const scale = (transformedZ + 2) / 3;
      const transform = `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`;
      const opacity = (transformedZ + 1.5) / 2.5;

      this.#tags[i].style.transform = transform;
      this.#tags[i].style.opacity = opacity;
    }
  }

  #onMouseMove(e) {
    const rootRect = this.#root.getBoundingClientRect();
    const deltaX = e.clientX - (rootRect.left + this.#root.offsetWidth / 2);
    const deltaY = e.clientY - (rootRect.top + this.#root.offsetHeight / 2);
    const a = Math.atan2(deltaX, deltaY) - Math.PI / 2;
    const axis = [Math.sin(a), Math.cos(a), 0];
    const delta = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    const speed = delta / Math.max(window.innerHeight, window.innerWidth) / 30;

    this.#rotationAxis = axis;
    this.#rotationSpeed = speed;
  }

  #update() {
    this.#rotationAngle += this.#rotationSpeed;

    this.#updatePositions();
  }

  start() {
    this.#update();

    this.#frameRequestId = requestAnimationFrame(this.start.bind(this));
  }

  stop() {
    cancelAnimationFrame(this.#frameRequestId);
  }
}
function main() {
  {
    const root = document.querySelector('.tags');
    const cloud = new TagsCloud(root);

    cloud.start();
  }
}
document.addEventListener('DOMContentLoaded', () => {
  main();
});
// ---- ---- C ---- ---- //
