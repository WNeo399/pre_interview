<script>
export default {
  props: {
    showMobileFilter: {
      type: Boolean,
      default: false,
    },
    screenMode: {
      type: String,
      default: "",
    },
    page: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      showError: false,
      sliderYear: [2008, 2022],
      maxYear: 2022,
      minYear: 2008,
      maxOdometer: 215167,
      minOdometer: 959,
      sliderOdometer: [959, 215167],
      filter: {
        limit: 10,
        make: "Audi",
        model: "A5",
        year: [2008, 2022],
        badge: "",
        bodyFilter: "",
        bodyConfigDescription: "",
        fuelType: "",
        transmissionType: "",
        engineDescription: "",
        cylinders: "",
        division: "",
        driveDescription: "",
        seatFilter: "",
        doorNum: "",
        odometer: [959, 215167],
        stateType: "",
        saleCategory: "",
        saleDate: "",
        sortBy: "sold_date",
        orderBy: "desc",
        keyword: "",

        yearHolder: "",
        odometerHolder: "Odometer",
      },
      filterOptions: {
        make: {
          model: "make",
          placeholder: "Make",
          options: [],
        },
        model: {
          model: "model",
          placeholder: "Family",
          options: [],
        },
        yearHolder: {
          model: "yearHolder",
          placeholder: "",
          options: [],
          special: "year",
        },
        badge: {
          model: "badge",
          placeholder: "Badges",
          options: [],
        },
        bodyFilter: {
          model: "bodyFilter",
          placeholder: "Body Type",
          options: [],
        },
        bodyConfigDescription: {
          model: "bodyConfigDescription",
          placeholder: "Body Type Config",
          options: [],
        },
        fuelType: {
          model: "fuelType",
          placeholder: "Fuel Type",
          options: [],
        },
        transmissionType: {
          model: "transmissionType",
          placeholder: "Transmission",
          options: [],
        },
        engineDescription: {
          model: "engineDescription",
          placeholder: "Engine",
          options: [],
        },
        cylinders: {
          model: "cylinders",
          placeholder: "Cylinders",
          options: [],
        },
        division: {
          model: "division",
          placeholder: "Division",
          options: [],
        },
        driveDescription: {
          model: "driveDescription",
          placeholder: "Drive",
          options: [],
        },
        seatFilter: {
          model: "seatFilter",
          placeholder: "Seat",
          options: [],
        },
        doorNum: {
          model: "doorNum",
          placeholder: "Doors",
          options: [],
        },
        odometerHolder: {
          model: "odometerHolder",
          placeholder: "",
          options: [],
          special: "odometer",
        },
        stateType: {
          model: "stateType",
          placeholder: "States",
          options: [],
        },
        saleCategory: {
          model: "saleCategory",
          placeholder: "Sale Category",
          options: [],
        },
        saleDate: {
          model: "saleDate",
          placeholder: "Sale Date",
          options: [
            { filter: 7, label: "Last 7 days" },
            { filter: 30, label: "Last 30 days" },
            { filter: 90, label: "Last 90 days" },
          ],
        },
        sortBy: {
          model: "sortBy",
          placeholder: "Sold Date",
          options: [
            { filter: "sold_date", label: "Sort | Sold Date" },
            { filter: "age", label: "Sort | Age" },
            { filter: "odometer", label: "Sort | Odometer" },
          ],
        },
        orderBy: {
          model: "orderBy",
          placeholder: "Order By",
          options: [
            { filter: "asc", label: "Ordre | Asc" },
            { filter: "desc", label: "Order | Desc" },
          ],
        },
      },
      query: "",
    };
  },
  watch: {
    "filter.make"() {
      this.filter.model = "";
      this.getFamily();
    },
    "filter.model"() {
      this.getSearchFilter();
    },
  },
  mounted() {
    this.getMakes();
    this.getFamily();
    this.getSearchFilter();
    this.applyFilter();
  },
  methods: {
    clearFilter() {
      this.filter = this.$options.data().filter;
      this.filter.make = "";
      this.filter.model = "";
      this.$emit("clear");
    },
    inputYearChange() {
      this.filter.yearHolder = `${this.filter.year[0]} | ${this.filter.year[1]}`;
      this.sliderYear = this.filter.year;
    },
    sliderYearChange() {
      this.filter.yearHolder = `${this.sliderYear[0]} | ${this.sliderYear[1]}`;
      this.filter.year = this.sliderYear;
    },
    getMakes() {
      fetch("http://localhost:3000/getMakes")
        .then((res) => res.json())
        .then((data) => {
          this.filterOptions.make.options = data;
        });
    },
    getFamily() {
      if (this.filter.make) {
        fetch(`http://localhost:3000/getFamilies?make=${this.filter.make}`)
          .then((res) => res.json())
          .then((data) => {
            this.filterOptions.model.options = data;
          });
      }
    },
    getSearchFilter() {
      if (this.filter.make && this.filter.model) {
        fetch(
          `http://localhost:3000/getSearchFilter?make=${this.filter.make}&model=${this.filter.model}`
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            this.maxYear = data.data.max_year;
            this.minYear = data.data.min_year;
            this.sliderYear = [this.minYear, this.maxYear];
            this.filter.year = [this.minYear, this.maxYear];
            this.filter.yearHolder = `${this.minYear} | ${this.maxYear}`;
            this.maxOdometer = data.data.max_odometer;
            this.minOdometer = data.data.min_odometer;
            this.sliderOdometer = [this.minOdometer, this.maxOdometer];
            this.filter.odometer = [this.minOdometer, this.maxOdometer];
            for (let key in data.data) {
              if (this.filterOptions.hasOwnProperty(key)) {
                this.filterOptions[key].options = data.data[key];
              }
            }
          });
      }
    },
    applyFilter() {
      let _this = this;
      if (!this.filter.make || !this.filter.model) {
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 2000);
      } else {
        this.$emit("clear");
        this.query = JSON.parse(JSON.stringify(this.filter));
        this.query.min_year = this.query.year[0];
        this.query.max_year = this.query.year[1];
        this.query.min_odometer = this.query.odometer[0];
        this.query.max_odometer = this.query.odometer[1];
        if (this.query.saleDate) {
          this.query.page = this.page;
          let today = new Date();
          this.query.max_sold_date = `${today.getFullYear()}-${
            today.getMonth() + 1
          }-${today.getDate()}`;
          today.setDate(today.getDate() - this.query.saleDate);
          this.query.min_sold_date = `${today.getFullYear()}-${
            today.getMonth() + 1
          }-${today.getDate()}`;
        }

        delete this.query.yearHolder;
        delete this.query.odometerHolder;
        delete this.query.year;
        delete this.query.odometer;
        for (let key in this.query) {
          if (this.query[key] == "") {
            delete this.query[key];
          }
        }
        this.getData().then((data) => {
          _this.$emit("endLoading");
          _this.$emit("emitResult", data.data);
        });
      }
    },
    async getData() {
      this.$emit("startLoading");
      let res = await fetch("http://localhost:3000/searchAll", {
        method: "POST",
        body: JSON.stringify(this.query),
        headers: {
          "Content-Type": "Application/json",
        },
      });
      let data = await res.json();
      return data;
    },
    loadMore() {
      let _this = this;
      this.getData().then((data) => {
        _this.$emit("endLoading");
        _this.$emit("lodeMoreResult", data.data);
      });
    },
  },
};
</script>

<template>
  <div
    v-show="screenMode == 'screen' || showMobileFilter"
    :class="screenMode == 'screen' ? 'screen-wrap' : 'mobile-wrap'"
  >
    <div
      class="close-mobile-search absolute top-4 right-4 cursor-pointer"
      @click="
        ($event) => {
          $emit('closeMobileFilter');
        }
      "
    >
      <svg
        _ngcontent-bsf-c202=""
        xmlns="http://www.w3.org/2000/svg"
        width="18.083"
        height="18.083"
        viewBox="0 0 18.083 18.083"
      >
        <path
          _ngcontent-bsf-c202=""
          id="Path_47"
          data-name="Path 47"
          d="M23.083,6.821,21.262,5l-7.22,7.22L6.821,5,5,6.821l7.22,7.22L5,21.262l1.821,1.821,7.22-7.22,7.22,7.22,1.821-1.821-7.22-7.22Z"
          transform="translate(-5 -5)"
          fill="#fff"
        ></path>
      </svg>
    </div>
    <div
      class="search-container"
      :class="screenMode == 'screen' ? 'screen' : 'mobile'"
    >
      <el-select
        class="w-36 h-9"
        v-for="(item, key) in filterOptions"
        :key="key"
        v-model="filter[item.model]"
        :placeholder="item.placeholder"
      >
        <template v-if="!item.special">
          <el-option
            v-for="(option, oindex) in item.options"
            :key="oindex"
            :label="option.label ? option.label : option.filter"
            :value="option.filter"
          ></el-option>
        </template>
        <div v-if="item.special && item.special == 'year'">
          <el-option :value="0" disabled style="cursor: unset">
            <div class="z-50" @click.stop="($event) => false">
              <div class="flex gap-1">
                <el-input
                  class="flex-grow"
                  v-model.number="filter.year[0]"
                  @input="inputYearChange"
                ></el-input>
                <el-input
                  class="flex-grow"
                  v-model.number="filter.year[1]"
                  @input="inputYearChange"
                ></el-input>
              </div>
            </div>
          </el-option>
          <el-option
            :value="1"
            disabled
            style="cursor: unset"
            v-if="filter.year[0] < minYear || filter.year[1] > maxYear"
          >
            <div style="color: red">
              Invalid:Min {{ minYear }},Max {{ maxYear }}
            </div>
          </el-option>
          <el-option :value="2" disabled style="cursor: unset">
            <div class="z-50" @click.stop="($event) => false">
              <el-slider
                v-model="sliderYear"
                @change="sliderYearChange"
                range
                :min="minYear"
                :max="maxYear"
              >
              </el-slider>
            </div>
          </el-option>
        </div>
        <div v-if="item.special && item.special == 'odometer'">
          <el-option :value="0" disabled style="cursor: unset">
            <div class="z-50" @click.stop="($event) => false">
              <div class="flex gap-1">
                <el-input
                  class="flex-grow"
                  v-model.number="filter.odometer[0]"
                  @input="
                    ($event) => {
                      sliderOdometer[0] = filter.odometer[0];
                    }
                  "
                ></el-input>
                <el-input
                  class="flex-grow"
                  v-model.number="filter.odometer[1]"
                  @input="
                    ($event) => {
                      sliderOdometer[1] = filter.odometer[1];
                    }
                  "
                ></el-input>
              </div>
            </div>
          </el-option>
          <el-option
            :value="1"
            disabled
            style="cursor: unset"
            v-if="
              filter.odometer[0] < minOdometer ||
              filter.odometer[1] > maxOdometer
            "
          >
            <div style="color: red">
              Invalid:Min {{ minOdometer }},Max {{ maxOdometer }}
            </div>
          </el-option>
          <el-option :value="2" disabled style="cursor: unset">
            <div class="z-50" @click.stop="($event) => false">
              <el-slider
                v-model="sliderOdometer"
                @change="
                  ($event) => {
                    filter.odometer = sliderOdometer;
                  }
                "
                range
                :min="minOdometer"
                :max="maxOdometer"
              >
              </el-slider>
            </div>
          </el-option>
        </div>
      </el-select>

      <div class="lg:hidden">
        <el-input
          v-model="filter.keyword"
          placeholder="e.g. Metallic Paint,Power front seats,Power Sunroof, ..."
          size="large"
        ></el-input>
      </div>

      <div class="btn-wrap w-max lg:hidden">
        <div class="filter-btn bg-blue" @click="applyFilter">Apply Filter</div>
        <div class="filter-btn bg-blue" @click="clearFilter">Clear Filter</div>
      </div>
      <div class="w-11/12 lg:flex items-center gap-2 hidden">
        <el-input
          v-model="filter.keyword"
          placeholder="e.g. Metallic Paint,Power front seats,Power Sunroof, ..."
          size="large"
        ></el-input>
        <div class="filter-btn bg-blue" @click="applyFilter">Apply Filter</div>
        <div class="filter-btn bg-blue" @click="clearFilter">Clear Filter</div>
        <div class="filter-btn bg-red">
          Subscribe to Generate Summary Report
        </div>
      </div>
    </div>

    <div
      class="err-message fixed bottom-8 left-1/2 -translate-x-1/2 z-50 py-3 px-4 rounded-md"
      v-show="showError"
      style="color: #ffffffb3; background: #323232"
    >
      Please choose make and model
    </div>
  </div>
</template>

<style scoped>
.filter-btn {
  @apply py-2 px-3 rounded-sm text-white cursor-pointer whitespace-nowrap;
}

.screen {
  @apply py-5 flex flex-wrap gap-2 overflow-auto;
}

.mobile-wrap {
  background-color: rgba(0, 0, 0, 0.4);
  @apply fixed top-0 bottom-0 left-0 right-0 z-50;
}

.mobile {
  @apply fixed top-0 left-0 bottom-0 bg-white p-5 flex flex-col gap-4 overflow-auto;
}

.filter-btn {
  @apply mb-4 lg:mb-0 py-2 px-3 rounded-sm text-white cursor-pointer;
}
</style>
