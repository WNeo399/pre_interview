<script>
export default {
  props: {
    alignMode: {
      type: String,
      default: "inline",
    },
    info: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      showDialog: false,
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      weeks: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    };
  },
  mounted() {},
  methods: {
    parseMonth(time) {
      let date = new Date(time);
      let year = date.getFullYear();
      let month = this.months[date.getMonth()];
      return `${month} ${year}`;
    },
    formateSoldDate(time) {
      let date = new Date(time);
      let year = date.getFullYear();
      let month = this.months[date.getMonth()];
      let d = date.getDate();
      let weekDay = this.weeks[date.getDay()];
      return `${weekDay}, ${month} ${d} ${year}`;
    },
  },
};
</script>

<template>
  <div
    class="vechile-box sm:w-1/2 px-2 box-border"
    :class="alignMode == 'inline' ? 'lg:w-full mb-4' : 'mb-8 lg:w-1/3'"
  >
    <div
      class="p-4 bg-white rounded-lg text-xs"
      :class="alignMode == 'inline' ? 'flex items-center justify-between' : ''"
      style="box-shadow: 0 0 5px #0000000d"
    >
      <div
        class="inline-left"
        :class="alignMode == 'inline' ? 'flex flex-col' : ''"
      >
        <h2 class="mb-2 text-sm">
          <strong>{{ info.VehicleDescription }}</strong> {{ info.Description }}
        </h2>
        <div
          class="flex"
          :class="alignMode == 'inline' ? 'flex-row items-center' : 'flex-col'"
        >
          <div class="tag flex items-center">
            <div>{{ info.SaleCategory }}</div>
            <div>{{ info.Odometer }} Kms</div>
            <div>Sold in {{ info.Branch }}</div>
          </div>
          <div
            class="condition-sole-date flex items-center"
            :class="alignMode == 'inline' ? 'my-0' : 'my-2'"
          >
            <div class="condition flex items-center mr-3">
              <img
                v-if="info.OverallCondition == 'Average'"
                src="https://pricespeoplepay.com.au/assets/images/average-condition.png"
                alt=""
                srcset=""
              />
              <img
                v-else-if="info.OverallCondition == 'Below Average'"
                src="	https://pricespeoplepay.com.au/assets/images/poor-condition.png"
                alt=""
                srcset=""
              />
              <img
                v-else
                src="https://pricespeoplepay.com.au/assets/images/good-condition.png"
                alt=""
              />
              {{ info.OverallCondition }} Condition
            </div>
            <div class="sold-date flex items-center">
              <svg
                _ngcontent-oyx-c202=""
                id="event-24px"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  _ngcontent-oyx-c202=""
                  id="Path_13"
                  data-name="Path 13"
                  d="M0,0H24V24H0Z"
                  fill="none"
                ></path>
                <path
                  _ngcontent-oyx-c202=""
                  id="Path_14"
                  data-name="Path 14"
                  d="M17,12H12v5h5ZM16,1V3H8V1H6V3H5A1.991,1.991,0,0,0,3.01,5L3,19a2,2,0,0,0,2,2H19a2.006,2.006,0,0,0,2-2V5a2.006,2.006,0,0,0-2-2H18V1Zm3,18H5V8H19Z"
                  fill="#0098dc"
                ></path>
              </svg>
              Sold {{ info.Sold_Date ? parseMonth(info.Sold_Date) : "--" }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="btn-wrap flex items-center justify-between text-sm mt-6"
        :class="alignMode == 'inline' ? 'mt-0 gap-2' : ''"
      >
        <div
          class="box-btn bg-red py-1 px-2 rounded-sm text-white cursor-pointer"
        >
          Subscribe to Reveal Price
        </div>
        <div
          class="box-btn py-1 px-2 rounded-sm cursor-pointer"
          style="border: 1px solid #00a0df; color: #00a0df"
          @click="
            ($event) => {
              showDialog = true;
            }
          "
        >
          See More
        </div>
      </div>
    </div>

    <el-dialog
      v-model="showDialog"
      style="max-width: 1000px; width: 80vw; margin-top: 5vh"
      :before-close="() => (showDialog = false)"
    >
      <div style="max-height: 80vh; overflow-y: scroll">
        <div
          class="flex lg:items-center justify-between pr-10 flex-col lg:flex-row"
        >
          <h1 class="font-bold text-2xl text-black">
            Vehicle Condition Report
          </h1>
          <div
            class="rounded-md bg-red cursor-pointer py-1 px-2 text-white w-max"
          >
            Subscrine to Reveal Price
          </div>
          <div
            class="close-btn absolute right-5 top-5 cursor-pointer"
            @click="this.showDialog = false"
          >
            <svg
              _ngcontent-ork-c200=""
              width="18px"
              height="18px"
              viewBox="0 0 25 25"
            >
              <path
                _ngcontent-ork-c200=""
                fill-rule="evenodd"
                fill="rgb(99, 114, 130)"
                d="M13.891,12.730 L23.729,22.568 C24.121,22.960 24.121,23.595 23.729,23.987 L23.019,24.697 C22.627,25.089 21.991,25.089 21.599,24.697 L11.762,14.860 L2.454,24.167 C2.064,24.558 1.430,24.558 1.040,24.167 L0.333,23.460 C-0.058,23.070 -0.058,22.436 0.333,22.046 L9.640,12.738 L0.303,3.401 C-0.089,3.009 -0.089,2.373 0.303,1.981 L1.013,1.271 C1.405,0.879 2.040,0.879 2.432,1.271 L11.770,10.609 L21.546,0.833 C21.936,0.442 22.570,0.442 22.960,0.833 L23.667,1.540 C24.058,1.930 24.058,2.564 23.667,2.954 L13.891,12.730 Z"
              ></path>
            </svg>
          </div>
        </div>
        <table class="w-full my-4">
          <tbody>
            <tr>
              <th>Make</th>
              <td>{{ info.Make ? info.Make : "--" }}</td>
            </tr>
            <tr>
              <th>Model</th>
              <td>{{ info.Model ? info.Model : "--" }}</td>
            </tr>
            <tr>
              <th>Year</th>
              <td>{{ info.YearGroup ? info.YearGroup : "--" }}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{{ info.Description ? info.Description : "--" }}</td>
            </tr>
            <tr>
              <th>Colour</th>
              <td>{{ info.Colour ? info.Colour : "--" }}</td>
            </tr>
            <tr>
              <th>Engine</th>
              <td>
                {{ info.EngineDescription ? info.EngineDescription : "--" }}
              </td>
            </tr>
            <tr>
              <th>Transmission</th>
              <td>
                {{ info.GearNum ? info.GearNum : "--" }}
                {{ info.GearTypeDescription ? info.GearTypeDescription : "--" }}
              </td>
            </tr>
            <tr>
              <th>Odometer</th>
              <td>{{ info.Odometer ? info.Odometer : "--" }}</td>
            </tr>
            <tr>
              <th>Sale Date</th>
              <td>
                {{ info.Sold_Date ? formateSoldDate(info.Sold_Date) : "--" }}
              </td>
            </tr>
            <tr>
              <th>Accessories</th>
              <td>
                {{ info.OptionsAccessories ? info.OptionsAccessories : "--" }}
              </td>
            </tr>
            <tr>
              <th>Auction Information</th>
              <td>--</td>
            </tr>
          </tbody>
        </table>

        <h1 class="font-bold text-2xl text-black">Vehicle Condition Report</h1>
        <div class="my-4">
          {{ info.ConditionDescription ? info.ConditionDescription : "--" }}
        </div>
        <div class="flex gap-5 bottom-table">
          <div class="flex-grow w-0">
            <h1 class="font-bold text-2xl text-black">Tyre Condition</h1>
            <table class="w-full my-4">
              <tbody>
                <tr>
                  <th>Left Front</th>
                  <td>
                    {{
                      info.TyreFrontOffCondition
                        ? info.TyreFrontOffCondition
                        : "--"
                    }}
                  </td>
                </tr>
                <tr>
                  <th>Left Rear</th>
                  <td>
                    {{
                      info.TyreRearOffCondition
                        ? info.TyreRearOffCondition
                        : "--"
                    }}
                  </td>
                </tr>
                <tr>
                  <th>Right Front</th>
                  <td>
                    {{
                      info.TyreFrontNearCondition
                        ? info.TyreFrontNearCondition
                        : "--"
                    }}
                  </td>
                </tr>
                <tr>
                  <th>Right Rear</th>
                  <td>
                    {{
                      info.TyreRearNearCondition
                        ? info.TyreRearNearCondition
                        : "--"
                    }}
                  </td>
                </tr>
                <tr>
                  <th>Spare</th>
                  <td>
                    {{
                      info.TyreSpareCondition ? info.TyreSpareCondition : "--"
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex-grow w-0">
            <h1 class="font-bold text-2xl text-black">Keys & Books</h1>
            <table class="w-full my-4">
              <tbody>
                <tr>
                  <th>Log Books</th>
                  <td>{{ info.LogBooks ? info.LogBooks : "--" }}</td>
                </tr>
                <tr>
                  <th>Owners Manual</th>
                  <td>
                    {{ info.OwnerManualStatus ? info.OwnerManualStatus : "--" }}
                  </td>
                </tr>
                <tr>
                  <th>Keys</th>
                  <td>{{ info.KeysStatus ? info.KeysStatus : "--" }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
.tag div {
  @apply rounded-sm py-1 px-2 mr-2;
  background: #f5f5f5;
}

.condition-sole-date svg,
.condition-sole-date img {
  width: 30px;
  height: 23px;
  margin-right: 8px;
}

th {
  background: #f9f9f9;
  border: 1px solid #e5e5e5;
  @apply w-1/5 text-sm p-3 text-left;
}

.bottom-table th {
  width: 60%;
}

td {
  border: 1px solid #e5e5e5;
  font-size: 14px;
  padding: 10px;
}
</style>
