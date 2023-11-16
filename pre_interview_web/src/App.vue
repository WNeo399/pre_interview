<script>
import TopHeader from "./components/TopHeader.vue";
import BottomFooter from "./components/BottomFooter.vue";
import SearchFilter from "./components/SearchFilter.vue";
import VechileBox from "./components/VechileBox.vue";
export default {
  components: {
    TopHeader,
    BottomFooter,
    SearchFilter,
    VechileBox,
  },
  data() {
    return {
      screenMode: "screen",
      page: 1,
      showMobileFilter: false,
      loading: false,
      showToTop: false,
      nowView: "inline",
      viewHolder: "inline",
      result: {
        avgAge: 0,
        avgAmount: 0,
        avgKm: 0,
        total: 0,
        records: [],
      },
    };
  },
  methods: {
    switchView(view) {
      this.nowView = view;
      this.viewHolder = view;
    },
    handleResize() {
      let width = document.body.clientWidth;
      if (width < 1024) {
        this.screenMode = "mobile";
        if (this.nowView == "inline") {
          this.nowView = "block";
          this.viewHolder = "inline";
        }
      } else if (width >= 1024) {
        this.screenMode = "screen";
        if (this.viewHolder != this.nowView) {
          this.nowView = this.viewHolder;
        }
      }
    },
    handleScroll() {
      if (document.documentElement.scrollTop > 400) {
        this.showToTop = true;
      } else {
        this.showToTop = false;
      }
    },
    handleGetResult(data) {
      this.page = 1;
      this.result = data;
      this.handleCloseMobileFilter();
    },
    handleLoadMore() {
      this.page++;
      this.$refs.filter.loadMore();
    },
    addMoreResult(data) {
      this.result.records = this.result.records.concat(data.records);
      this.handleCloseMobileFilter();
    },
    handleClear() {
      this.result = this.$options.data().result;
    },
    handleShowMobileFilter() {
      this.showMobileFilter = true;
      document.body.style.maxHeight = "100vh";
      document.body.style.overflow = "hidden";
    },
    handleCloseMobileFilter() {
      this.showMobileFilter = false;
      document.body.style.maxHeight = "unset";
      document.body.style.overflow = "auto";
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("scroll", this.handleScroll);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<template>
  <div>
    <TopHeader id="header"></TopHeader>

    <div class="main container m-auto p-5" style="min-height: 70vh">
      <h1 class="font-bold text-xl lg:text-4xl">Search Used Car Prices</h1>

      <SearchFilter
        :page="page"
        :showMobileFilter="showMobileFilter"
        :screenMode="screenMode"
        @emitResult="handleGetResult"
        @lodeMoreResult="addMoreResult"
        @clear="handleClear"
        @closeMobileFilter="handleCloseMobileFilter"
        @startLoading="loading = true"
        @endLoading="loading = false"
        ref="filter"
      ></SearchFilter>

      <!-- State && Mobile Filter Opener -->
      <div
        class="mobile-filter flex items-center justify-between py-2 px-4 -mx-5 mb-3 text-white cursor-pointer bg-blue lg:hidden"
        @click="handleShowMobileFilter"
      >
        <div class="title" v-if="result.records.length > 0">
          {{ result.records[0].Make }} {{ result.records[0].Model }} Stats:
        </div>
        <div class="filter-btn flex items-center">
          <svg
            _ngcontent-bsf-c202=""
            xmlns="http://www.w3.org/2000/svg"
            width="15.913"
            height="16"
            viewBox="0 0 15.913 16"
          >
            <path
              _ngcontent-bsf-c202=""
              id="Path_5"
              data-name="Path 5"
              d="M4.25,5.61C6.27,8.2,10,13,10,13v6a1,1,0,0,0,1,1h2a1,1,0,0,0,1-1V13s3.72-4.8,5.74-7.39A1,1,0,0,0,18.95,4H5.04A1,1,0,0,0,4.25,5.61Z"
              transform="translate(-4.038 -4)"
              fill="#fff"
            ></path>
          </svg>
          Filters
        </div>
      </div>
      <div
        v-if="result.records.length > 0"
        class="vechile-state-wrap flex items-center flex-wrap relative text-sm lg:flex-nowrap lg:mb-4 lg:bg-white lg:h-10"
      >
        <div
          class="vechile-title bg-blue text-white whitespace-nowrap h-full hidden lg:block leading-10 px-4"
        >
          {{ result.records[0].Make }} {{ result.records[0].Model }} Stats:
        </div>
        <div class="vechile-state-item">
          <svg
            _ngcontent-oyx-c202=""
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="14"
            viewBox="0 0 17 14"
          >
            <path
              _ngcontent-oyx-c202=""
              id="Path_8"
              data-name="Path 8"
              d="M4,14H8V10H4Zm0,5H8V15H4ZM4,9H8V5H4Zm5,5H21V10H9Zm0,5H21V15H9ZM9,5V9H21V5Z"
              transform="translate(-4 -5)"
              fill="#8e969e"
            ></path>
          </svg>
          Records: {{ result.total }}
        </div>
        <div class="vechile-state-item">
          <svg
            _ngcontent-oyx-c202=""
            xmlns="http://www.w3.org/2000/svg"
            width="22.984"
            height="23"
            viewBox="0 0 22.984 23"
          >
            <path
              _ngcontent-oyx-c202=""
              id="Path_9"
              data-name="Path 9"
              d="M22.993,4.412a12.756,12.756,0,0,1-1.587,6.139.683.683,0,0,1-1.167-.709,11.566,11.566,0,0,0,1.389-5.43A2.805,2.805,0,0,0,18.9,1.365,2.733,2.733,0,0,0,16.168,4.1a21.589,21.589,0,0,0,.43,2.846.683.683,0,0,1-1.336.279A22.44,22.44,0,0,1,14.8,4.1,4.1,4.1,0,0,1,18.9,0,4.168,4.168,0,0,1,22.993,4.412ZM19.013,5.486c.271,2.268.665,6.688.213,7.138L9.308,22.542a1.562,1.562,0,0,1-2.21,0L.466,15.911a1.563,1.563,0,0,1,0-2.21l9.919-9.918a14.78,14.78,0,0,1,3.8-.064c-.011.127-.038.247-.038.377a13.511,13.511,0,0,0,.224,1.936A1.877,1.877,0,1,0,17,5.543a11.44,11.44,0,0,1-.18-1.447c0-.061.012-.117.018-.176.238.025.472.051.693.078C18.84,4.159,18.853,4.156,19.013,5.486Zm-5.286,7.423a4.276,4.276,0,0,0-.966-1.532l.753-.754-.838-.837-.812.813a2.219,2.219,0,0,0-2.969.077c-.829.829-.634,1.882-.025,3.105.418.847.495,1.335.17,1.659s-.872.189-1.361-.3a4.269,4.269,0,0,1-1.043-1.8l-1.258.746A4.9,4.9,0,0,0,6.472,15.9l-.82.821.837.838.882-.881a2.3,2.3,0,0,0,3.1-.051c.779-.78.847-1.652.18-3.038-.463-.993-.574-1.481-.3-1.754.24-.24.667-.309,1.223.247a3.762,3.762,0,0,1,.933,1.532Z"
              transform="translate(-0.008)"
              fill="#8e969e"
            ></path>
          </svg>
          Avg Price: <a class="ml-2">Subscribe to Reveal Price</a>
        </div>
        <div class="vechile-state-item">
          <svg
            _ngcontent-oyx-c202=""
            xmlns="http://www.w3.org/2000/svg"
            width="30.094"
            height="16"
            viewBox="0 0 30.094 16"
          >
            <g
              _ngcontent-oyx-c202=""
              id="meter"
              transform="translate(0 -55.477)"
            >
              <path
                _ngcontent-oyx-c202=""
                id="Path_10"
                data-name="Path 10"
                d="M25.767,59.976a.978.978,0,0,0-.08-.092.992.992,0,0,0-.091-.08,15,15,0,0,0-10.547-4.328h0A15,15,0,0,0,4.5,59.8a.942.942,0,0,0-.091.08.959.959,0,0,0-.08.092A15,15,0,0,0,0,70.524a.953.953,0,0,0,.953.953H29.142a.953.953,0,0,0,.953-.953A15,15,0,0,0,25.767,59.976Zm-6.883,9.6h-.643A3.336,3.336,0,0,0,17.227,68l.281-.57A3.962,3.962,0,0,1,18.884,69.572Zm-3.4-2.351a3.328,3.328,0,0,0-3.636,2.351H11.21a3.949,3.949,0,0,1,4.566-2.933Zm4.694,2.351a5.231,5.231,0,0,0-2.1-3.3l2.278-4.619a.953.953,0,0,0-1.709-.843l-2.3,4.653a5.225,5.225,0,0,0-6.443,4.106H1.94a13.085,13.085,0,0,1,3.17-7.637l.65.65a.953.953,0,0,0,1.348-1.347l-.65-.65a13.086,13.086,0,0,1,7.637-3.17V58.5A.953.953,0,0,0,16,58.5V57.417a13.087,13.087,0,0,1,7.637,3.17l-.65.65a.953.953,0,0,0,1.348,1.347l.65-.65a13.085,13.085,0,0,1,3.17,7.637H20.183Z"
                fill="#8e969e"
              ></path>
            </g>
          </svg>
          Avg KM: {{ result.avgKm }} kms
        </div>
        <div class="vechile-state-item">
          <svg
            _ngcontent-oyx-c202=""
            id="calendar_today-24px_1_"
            data-name="calendar_today-24px (1)"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              _ngcontent-oyx-c202=""
              id="Path_11"
              data-name="Path 11"
              d="M0,0H24V24H0Z"
              fill="none"
            ></path>
            <path
              _ngcontent-oyx-c202=""
              id="Path_12"
              data-name="Path 12"
              d="M20,3H19V1H17V3H7V1H5V3H4A2.006,2.006,0,0,0,2,5V21a2.006,2.006,0,0,0,2,2H20a2.006,2.006,0,0,0,2-2V5A2.006,2.006,0,0,0,20,3Zm0,18H4V8H20Z"
              fill="#8e969e"
            ></path>
          </svg>
          Avg Age: {{ result.avgAge }} months
        </div>
        <div
          class="switch-view hidden rounded-sm overflow-hidden absolute right-3 lg:flex"
        >
          <div
            :class="nowView == 'inline' ? 'active' : ''"
            @click="switchView('inline')"
            class="switch-btn"
          >
            <svg
              _ngcontent-oyx-c202=""
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13.2"
              viewBox="0 0 13 13.2"
            >
              <path
                _ngcontent-oyx-c202=""
                id="Path_20"
                data-name="Path 20"
                d="M8.159,0H5.041V13H8.159ZM13.2,0H10.081V13H13.2ZM3.119,13V0H0V13Z"
                transform="translate(13) rotate(90)"
                fill="#8e969e"
              ></path>
            </svg>
          </div>
          <div
            :class="nowView == 'block' ? 'active' : ''"
            @click="switchView('block')"
            class="switch-btn"
          >
            <svg
              _ngcontent-oyx-c202=""
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="11.5"
              viewBox="0 0 11 11.5"
            >
              <path
                _ngcontent-oyx-c202=""
                id="Path_18"
                data-name="Path 18"
                d="M4,10.308H9V5H4ZM4,16.5H9V11.192H4Zm6,0h5V11.192H10Zm0-6.192h5V5H10Z"
                transform="translate(-4 -5)"
                fill="#8e969e"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <div
        class="subscript text-center py-2 rounded-sm text-white text-sm lg:hidden bg-blue"
      >
        Subscribe to Generate Summary Report
      </div>

      <div
        class="valuation bg-red text-center py-2 mb-4 text-white text-sm flex items-center justify-center"
        style="box-shadow: 0 0 10px #ddd"
      >
        Need a Prices People Pay Valuation Report?
        <div
          class="py-1 px-6 rounded-full bg-white ml-2"
          style="color: #ff5a60"
        >
          Get One Now
        </div>
      </div>

      <!-- Vechile Box Container -->
      <div
        class="vechile-box-container flex flex-col sm:flex-row sm:flex-wrap"
        v-if="result.records.length > 0"
      >
        <VechileBox
          :alignMode="nowView"
          v-for="(item, index) in result.records"
          :info="item"
          :key="index"
        ></VechileBox>
      </div>

      <!-- Load More BTN -->
      <div
        class="load-more py-3 px-7 bg-blue rounded-md w-max text-white m-auto cursor-pointer"
        @click="handleLoadMore"
        v-if="result.records.length > 0 && page * 10 < result.total && !loading"
      >
        Load More
      </div>

      <!-- Loading -->
      <div
        class="loading"
        :class="result.records.length > 0 ? 'data-loading' : 'no-data-loading'"
        v-loading="loading"
      ></div>

      <!-- No Data -->
      <div
        class="no-data flex flex-col items-center justify-center mb-10"
        v-if="(result.records.length == 0) & !loading"
      >
        <img
          src="	https://pricespeoplepay.com.au/assets/images/search-empty.png"
          style="width: 120px; height: 120px"
          alt=""
          srcset=""
        />
        <h3 class="font-bold text-lg">No records available</h3>
      </div>

      <!-- TO TOP BTN -->
      <a
        v-show="showToTop"
        href="#header"
        class="flex items-center justify-center fixed -right-20 bottom-48 text-xl text-white bg-blue rounded-md cursor-pointer hover:-right-0 transition-all"
      >
        <span class="arrow-up py-3 px-4" style="border-right: 1px solid #ccc">
          <svg
            _ngcontent-abt-c202=""
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="25px"
            height="25px"
          >
            <defs _ngcontent-abt-c202="">
              <filter
                _ngcontent-abt-c202=""
                filterUnits="userSpaceOnUse"
                id="Filter_0"
                x="0px"
                y="0px"
                width="25px"
                height="25px"
              >
                <feOffset
                  _ngcontent-abt-c202=""
                  in="SourceAlpha"
                  dx="0.669"
                  dy="0.743"
                ></feOffset>
                <feGaussianBlur
                  _ngcontent-abt-c202=""
                  result="blurOut"
                  stdDeviation="1.414"
                ></feGaussianBlur>
                <feFlood
                  _ngcontent-abt-c202=""
                  flood-color="rgb(0, 0, 0)"
                  result="floodOut"
                ></feFlood>
                <feComposite
                  _ngcontent-abt-c202=""
                  operator="atop"
                  in="floodOut"
                  in2="blurOut"
                ></feComposite>
                <feComponentTransfer _ngcontent-abt-c202="">
                  <feFuncA
                    _ngcontent-abt-c202=""
                    type="linear"
                    slope="0.22"
                  ></feFuncA>
                </feComponentTransfer>
                <feMerge _ngcontent-abt-c202="">
                  <feMergeNode _ngcontent-abt-c202=""></feMergeNode>
                  <feMergeNode
                    _ngcontent-abt-c202=""
                    in="SourceGraphic"
                  ></feMergeNode>
                </feMerge>
              </filter>
            </defs>
            <g _ngcontent-abt-c202="" filter="url(#Filter_0)">
              <path
                _ngcontent-abt-c202=""
                fill-rule="evenodd"
                fill="rgb(255, 255, 255)"
                d="M2.187,12.875 L9.687,5.437 L9.687,21.688 L12.313,21.688 L12.313,5.437 L19.750,12.875 L21.688,11.000 L11.000,0.312 L0.312,11.000 L2.187,12.875 Z"
              ></path>
            </g>
          </svg>
        </span>
        <span class="top py-3 px-4 text-white">TOP</span>
      </a>

      <!-- Feedback BTN -->
      <div
        class="feedback-btn rounded-full bg-red-500 w-20 h-20 fixed bottom-3 right-3 z-50 flex items-center justify-center"
      >
        <svg
          class="w-10 h-10"
          _ngcontent-bsf-c220=""
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 28 32"
          fill="#fff"
        >
          <path
            _ngcontent-bsf-c220=""
            d="M28,32 C28,32 23.2863266,30.1450667 19.4727818,28.6592 L3.43749107,28.6592 C1.53921989,28.6592 0,27.0272 0,25.0144 L0,3.6448 C0,1.632 1.53921989,0 3.43749107,0 L24.5615088,0 C26.45978,0 27.9989999,1.632 27.9989999,3.6448 L27.9989999,22.0490667 L28,22.0490667 L28,32 Z M23.8614088,20.0181333 C23.5309223,19.6105242 22.9540812,19.5633836 22.5692242,19.9125333 C22.5392199,19.9392 19.5537934,22.5941333 13.9989999,22.5941333 C8.51321617,22.5941333 5.48178311,19.9584 5.4277754,19.9104 C5.04295119,19.5629428 4.46760991,19.6105095 4.13759108,20.0170667 C3.97913051,20.2124916 3.9004494,20.4673395 3.91904357,20.7249415 C3.93763774,20.9825435 4.05196575,21.2215447 4.23660523,21.3888 C4.37862552,21.5168 7.77411059,24.5386667 13.9989999,24.5386667 C20.2248893,24.5386667 23.6203743,21.5168 23.7623946,21.3888 C23.9467342,21.2215726 24.0608642,20.9827905 24.0794539,20.7254507 C24.0980436,20.4681109 24.0195551,20.2135019 23.8614088,20.0181333 Z"
          ></path>
        </svg>
      </div>
    </div>
    <BottomFooter></BottomFooter>
  </div>
</template>

<style scoped>
.vechile-state-item {
  @apply w-2/4 mb-4 flex items-center lg:w-auto lg:mb-0 whitespace-nowrap lg:px-4;
}

.vechile-state-item svg {
  margin-right: 6px;
  width: 18px;
  height: 24px;
}

.switch-btn {
  @apply w-7 h-6 flex items-center justify-center cursor-pointer;
  border: 1px solid #8e969e;
}

.switch-btn.active {
  background: #8e969e;
  border-width: 0;
}

.switch-btn.active svg path {
  fill: white;
}

.switch-btn:first-of-type {
  border-right-width: 0;
}

.switch-btn:last-of-type {
  border-left-width: 0;
}

.switch-view svg {
  width: 13px;
  height: 13px;
}

.load-more:hover {
  background: #0085b9;
}

.no-data-loading >>> svg {
  width: 200px;
  height: 200px;
}
</style>
