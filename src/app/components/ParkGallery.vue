<template>
    <div class="park-gallery">
        <a
            class="park-gallery__element"
            v-for="image in images"
            v-bind:href="image.org.sizes.window.url"
            v-bind:data-width="image.org.sizes.window.width"
            v-bind:data-height="image.org.sizes.window.height"
            target="_blank"
        >
            <LazyImage :image="image" ratio="3x2"></LazyImage>
        </a>
    </div>
</template>

<script>
import LazyImage from "./globals/LazyImage.vue";
import Flickity from "flickity";
import PhotoSwipe from "photoswipe";
import PhotoSwipeUI_Default from "photoswipe/dist/photoswipe-ui-default";

const PsTemplate =
    '<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true"><div class="pswp__bg"></div><div class="pswp__scroll-wrap"><div class="pswp__container"><div class="pswp__item"></div><div class="pswp__item"></div><div class="pswp__item"></div></div><div class="pswp__ui pswp__ui--hidden"><div class="pswp__top-bar"><div class="pswp__counter"></div><button class="pswp__button pswp__button--close" title="Close (Esc)"></button><button class="pswp__button pswp__button--share" title="Share"></button><button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button><button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button><div class="pswp__preloader"><div class="pswp__preloader__icn"><div class="pswp__preloader__cut"><div class="pswp__preloader__donut"></div></div></div></div></div><div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"><div class="pswp__share-tooltip"></div></div><button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button><button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button><div class="pswp__caption"><div class="pswp__caption__center"></div></div></div></div></div>';

export default {
    props: ["images"],
    components: {
        LazyImage
    },
    mounted() {
        if (document.getElementById("PhotoSwipeTemplate") === null) {
            const e = document.createElement("div");
            e.setAttribute("id", "PhotoSwipeTemplate");
            e.innerHTML = PsTemplate;
            document.body.appendChild(e);
        }

        const $gallery = this.$el;
        const $links = $gallery.querySelectorAll(".park-gallery__element");
        const flkty = new Flickity($gallery, {
            cellAlign: "left",
            imagesLoaded: true,
            pageDots: false,
            percentPosition: false
        });

        const pswpElement = document.querySelectorAll(".pswp")[0];
        const items = [];

        $links.forEach($el => {
            items.push({
                src: $el.getAttribute("href"),
                w: $el.getAttribute("data-width"),
                h: $el.getAttribute("data-height")
            });
        });

        let options = {
            history: false,
            fullscreenEl: false,
            zoomEl: false,
            shareEl: false,
            bgOpacity: 0.9,
            showHideOpacity: true,
            getThumbBoundsFn: function(index) {
                const pageYScroll = window.pageYOffset;
                const rect = $gallery.getBoundingClientRect();
                return {
                    x: rect.left,
                    y: rect.top + pageYScroll,
                    w: rect.width
                };
            }
        };

        let i = 0;
        $links.forEach($el => {
            $el.setAttribute("data-index", i);
            i++;
            $el.onclick = function(event) {
                event.preventDefault();
                options["index"] = parseInt($el.getAttribute("data-index"));

                const gallery = new PhotoSwipe(
                    pswpElement,
                    PhotoSwipeUI_Default,
                    items,
                    options
                );
                gallery.init();
                gallery.listen("afterChange", function() {
                    flkty.select(gallery.getCurrentIndex());
                });
            };
        });
    }
};
</script>