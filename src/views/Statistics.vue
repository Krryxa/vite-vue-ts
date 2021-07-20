<template>
  <div class="container">
    <div class="h3-title">会议论坛看板</div>
    <div class="c-box">
      <div class="modules">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="m-box">
              <h2>已申报会议</h2>
              <el-row :gutter="16">
                <el-col :span="12">
                  <div class="inner-block">
                    <span class="i-b-icon declared"></span>
                    <span class="i-b-title">当前数量</span>
                    <span class="i-b-number number">{{
                      toThousands(meetingData.declared.current)
                    }}</span>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="inner-block">
                    <span
                      class="i-b-icon"
                      :class="meetingData.declared.up ? 'con-up' : 'con-down'"
                    ></span>
                    <span class="i-b-title">较昨日对比</span>
                    <span class="i-b-number number">{{
                      toThousands(meetingData.declared.contrast)
                    }}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="m-box">
              <h2>已确认会议</h2>
              <el-row :gutter="16">
                <el-col :span="12">
                  <div class="inner-block">
                    <span class="i-b-icon confirmed"></span>
                    <span class="i-b-title">当前数量</span>
                    <span class="i-b-number number">{{
                      toThousands(meetingData.confirmed.current)
                    }}</span>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="inner-block">
                    <span
                      class="i-b-icon"
                      :class="meetingData.confirmed.up ? 'con-up' : 'con-down'"
                    ></span>
                    <span class="i-b-title">较昨日对比</span>
                    <span class="i-b-number number">{{
                      toThousands(meetingData.confirmed.contrast)
                    }}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="modules" v-for="(ele, index) in dataSource" :key="index">
        <div class="m-box" :class="ele.className">
          <h2>{{ ele.title }}</h2>
          <router-link
            v-if="ele.link"
            class="h-link"
            :to="{ name: ele.link.routerName }"
            >{{ ele.link.name }}</router-link
          >
          <el-row :gutter="16">
            <el-col :span="6">
              <div class="inner-block-sec">
                <div class="i-b-top">{{ ele.main.subhead }}</div>
                <div class="i-b-number number">
                  {{ toThousands(ele.main.total) }}
                </div>
                <div class="i-b-bottom">
                  <span class="i-b-title">较昨日对比</span>
                  <span class="i-b-stable">
                    <i
                      :class="ele.main.up ? 'el-icon-top' : 'el-icon-bottom'"
                    ></i>
                    {{ toThousands(ele.main.contrast) }}
                  </span>
                </div>
              </div>
            </el-col>
            <el-col
              :span="6"
              v-for="(jcl, index) in ele.subModules"
              :key="index"
            >
              <div v-if="!jcl.percent" class="inner-block-sec inner-sec">
                <div class="top-con">
                  <div class="i-sec-top">{{ jcl.subhead }}</div>
                  <div class="i-sec-number number">
                    {{ toThousands(jcl.total) }}
                  </div>
                </div>
                <div class="i-b-bottom" :class="jcl.up ? 'up' : 'down'">
                  <span class="i-b-title">较昨日对比</span>
                  <span class="i-b-stable"
                    ><i
                      :class="
                        jcl.up
                          ? 'el-icon-top up-icon'
                          : 'el-icon-bottom down-icon'
                      "
                    ></i
                    >{{ toThousands(jcl.contrast) }}</span
                  >
                </div>
              </div>
              <div v-else class="inner-block-sec inner-sec">
                <div class="top-con percent">
                  <div class="i-sec-top">{{ jcl.subhead }}</div>
                  <div class="i-sec-number number">{{ jcl.percent }}</div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      meetingData: {
        declared: {
          current: 10002,
          contrast: '+2030',
          up: true
        },
        confirmed: {
          current: 202,
          contrast: '-100',
          up: false
        }
      },
      dataSource: [
        {
          title: '高级别嘉宾统计',
          className: '',
          link: {
            name: '嘉宾详情',
            routerName: 'home'
          },
          main: {
            subhead: '拟邀请嘉宾总数',
            total: '54312',
            contrast: '+10340',
            up: true
          },
          subModules: [
            {
              subhead: '高级别嘉宾',
              total: '550',
              contrast: '+1400',
              up: true
            },
            {
              subhead: '发言嘉宾',
              total: '550',
              contrast: '+1100',
              up: false
            },
            {
              subhead: '高级别发言嘉宾占比',
              percent: '20%'
            }
          ]
        },
        {
          title: '参会机构统计',
          className: 'organization',
          main: {
            subhead: '拟邀请参会机构总数',
            total: '512350',
            contrast: '+1030',
            up: true
          },
          subModules: [
            {
              subhead: '境内参会机构',
              total: '512350',
              contrast: '+100',
              up: true
            },
            {
              subhead: '境外参会机构',
              total: '512350',
              contrast: '+100',
              up: false
            },
            {
              subhead: '境外参会机构占比',
              percent: '20%'
            }
          ]
        },
        {
          title: '拟发布成果统计',
          className: 'achievement',
          link: {
            name: '成果详情',
            routerName: 'base'
          },
          main: {
            subhead: '成果总数',
            total: '55230',
            contrast: '+101230',
            up: true
          },
          subModules: [
            {
              subhead: '项目签约',
              total: '550',
              contrast: '+1020',
              up: true
            },
            {
              subhead: '行业报告',
              total: '512350',
              contrast: '+100',
              up: false
            },
            {
              subhead: '行业指数',
              total: '512350',
              contrast: '+100',
              up: false
            },
            {
              subhead: '行业联盟或平台',
              total: '512350',
              contrast: '+1020',
              up: false
            },
            {
              subhead: '新技术、新产品',
              total: '550',
              contrast: '+1040',
              up: true
            },
            {
              subhead: '其它',
              total: '550',
              contrast: '+10420',
              up: false
            }
          ]
        }
      ]
    }
  },
  created() {},
  methods: {
    toThousands(val) {
      let originStr = (val || 0).toString()
      let result = ''
      let operator = originStr.charAt(0)
      let num = originStr
      if (['+', '-'].includes(operator)) {
        num = originStr.slice(1)
      } else {
        operator = ''
      }
      while (num.length > 3) {
        result = ',' + num.slice(-3) + result
        num = num.slice(0, num.length - 3)
      }
      if (num) {
        result = num + result
      }
      return operator + result
    }
  }
}
</script>

<style scoped lang="scss">
.el-row {
  display: block;

  .el-col-6 {
    width: 25%;
  }

  .el-col-12 {
    width: 50%;
  }
}

.container {
  min-width: 900px;
  background: #f9fafc;

  .h3-title {
    padding: 24px;
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;
    background: #fff;
  }

  .c-box {
    margin: 16px 16px 0;

    .modules {
      padding-bottom: 16px;

      .m-box {
        padding: 15px;
        background: #fff;

        .up {
          color: #40d8ab;
          background: rgba(64, 216, 170, 0.151) !important;
        }

        .down {
          color: #fd7e65;
          background: rgba(253, 126, 101, 0.158) !important;
        }

        .number {
          font-size: 16px;
          font-weight: 600;
        }

        &.organization {
          .inner-block-sec {
            &:not(.inner-sec) {
              background: linear-gradient(
                225deg,
                rgba(114, 140, 255, 1) 0%,
                rgba(168, 147, 254, 1) 100%
              );

              .i-b-bottom {
                background: rgba(125, 142, 255, 1);

                .i-b-stable {
                  i {
                    color: #3c4cb9;
                  }
                }
              }
            }

            &.inner-sec {
              .top-con {
                .i-sec-top {
                  &::before {
                    background: linear-gradient(
                      225deg,
                      rgba(114, 140, 255, 1) 0%,
                      rgba(168, 147, 254, 1) 100%
                    );
                  }
                }
              }
            }
          }
        }

        &.achievement {
          .inner-block-sec {
            &:not(.inner-sec) {
              height: 216px;
              padding-top: 70px;
              background: linear-gradient(
                135deg,
                rgba(253, 170, 187, 1) 0%,
                rgba(249, 113, 134, 1) 100%
              );

              .i-b-top {
                font-size: 14px;
                font-weight: 600;
              }

              .i-b-bottom {
                margin-top: 59px;
                background: rgba(255, 98, 67, 0.527);

                .i-b-stable {
                  i {
                    color: #f95961;
                  }
                }
              }

              .i-b-number {
                margin: 14px 0;
                font-size: 20px;
              }
            }

            &.inner-sec {
              .top-con {
                .i-sec-top {
                  &::before {
                    background: linear-gradient(
                      135deg,
                      rgba(253, 170, 187, 1) 0%,
                      rgba(249, 113, 134, 1) 100%
                    );
                  }
                }
              }
            }
          }
        }

        h2 {
          display: inline-block;
          margin: 0;
          font-family: PingFangSC;
          font-size: 14px;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);

          &::before {
            display: inline-block;
            width: 5px;
            height: 15px;
            margin-top: -1px;
            margin-right: 7px;
            vertical-align: middle;
            content: '';
            background: linear-gradient(180deg, #ff7800 0%, #ffae51 100%);
            border-radius: 2px;
          }
        }

        .h-link {
          float: right;
          font-size: 12px;
          color: #4762fe;
        }

        .inner-block {
          box-sizing: border-box;
          height: 70px;
          padding: 10px 14px;
          margin-top: 15px;
          line-height: 50px;
          color: #fff;
          background: linear-gradient(
            270deg,
            rgba(255, 120, 0, 1) 0%,
            rgba(255, 164, 61, 1) 100%
          );
          border-radius: 4px;

          .i-b-icon {
            display: inline-block;
            width: 28px;
            height: 28px;
            margin-right: 10px;
            vertical-align: middle;

            &.declared {
              background: url(../assets/img/declared.png);
              background-size: 100% 100%;
            }

            &.confirmed {
              background: url(../assets/img/confirmed.png);
              background-size: 100% 100%;
            }

            &.con-up {
              background: url(../assets/img/up.png);
              background-size: 100% 100%;
            }

            &.con-down {
              background: url(../assets/img/down.png);
              background-size: 100% 100%;
            }
          }

          .i-b-title {
            font-size: 12px;
          }

          .i-b-number {
            float: right;
          }
        }

        .inner-block-sec {
          box-sizing: border-box;
          height: 100px;
          padding: 14px;
          margin-top: 15px;
          color: #fff;
          background: linear-gradient(
            154.81deg,
            rgba(64, 216, 171, 1) 0%,
            rgba(29, 173, 130, 1) 100%
          );
          border-radius: 4px;

          .i-b-top {
            font-size: 12px;
            text-align: center;
          }

          .i-b-number {
            margin: 6px 0;
            text-align: center;
          }

          .i-b-bottom {
            box-sizing: border-box;
            width: calc(100% + 28px);
            height: 26px;
            padding: 0 10px;
            margin-top: 15px;
            margin-left: -14px;
            line-height: 26px;
            background: rgba(9, 166, 118, 1);
            border-radius: 0 0 4px 4px;

            .i-b-title {
              float: left;
              font-size: 12px;
            }

            .i-b-stable {
              float: right;
              font-size: 12px;
              font-weight: 600;

              i {
                padding: 3px;
                font-size: 8px;
                font-weight: 600;
                color: #00422e;
                background: #fff;
                border-radius: 50%;
                transform: scale(0.7);
              }
            }
          }

          .center {
            text-align: center;
          }

          &.inner-sec {
            background: #fff;
            border: 1px solid rgba(238, 238, 238, 1);
            border-radius: 4px;

            .top-con {
              overflow: hidden;
              line-height: 43px;

              .i-sec-top {
                float: left;
                font-size: 12px;
                color: #333;

                &::before {
                  display: inline-block;
                  width: 6px;
                  height: 6px;
                  margin-top: -2px;
                  margin-right: 9px;
                  vertical-align: middle;
                  content: '';
                  background: linear-gradient(
                    154.81deg,
                    rgba(64, 216, 171, 1) 0%,
                    rgba(29, 173, 130, 1) 100%
                  );
                  border-radius: 50%;
                }
              }

              .i-sec-number {
                float: right;
                color: #333;
              }

              &.percent {
                padding: 8px 0;

                .i-sec-top,
                .i-sec-number {
                  float: none;
                  line-height: 28px;
                  text-align: center;
                }
              }
            }

            .i-b-bottom {
              border-radius: 0 0 3px 3px;

              .i-b-title {
                color: #666;
              }
            }

            .i-b-stable {
              i {
                margin-right: 4px;
                color: #fff;

                &.up-icon {
                  background: #40d8ab;
                }

                &.down-icon {
                  background: #fd7e65;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
