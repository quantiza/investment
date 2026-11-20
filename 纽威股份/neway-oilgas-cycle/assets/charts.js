/* 纽威股份油气周期专项分析 - 图表脚本（ECharts SVG renderer） */
(function () {
  'use strict';

  var INK = '#1a2420';
  var MUTED = '#5e6d64';
  var RULE = '#dde3de';
  var ACCENT = '#1e6e54';
  var ACCENT2 = '#b5121b';
  var GOLD = '#c89b3c';
  var BLUE = '#4a7a8c';
  var FONT = 'WorkSans, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif';

  function baseAxis(namePct) {
    return {
      axisLine: { lineStyle: { color: MUTED } },
      axisLabel: { color: MUTED, fontSize: 11, fontFamily: FONT },
      splitLine: { lineStyle: { color: RULE, type: 'dashed' } }
    };
  }

  function mkTooltip(unit) {
    return {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      textStyle: { fontSize: 12, fontFamily: FONT },
      valueFormatter: function (v) { return (v === null || v === undefined || v === '-') ? '-' : v + (unit || ''); }
    };
  }

  var registry = {
    /* 图1 纽威营收与归母净利 */
    'chart-fin': function (el) {
      return {
        tooltip: mkTooltip(' 亿元'),
        legend: { top: 0, textStyle: { color: INK, fontSize: 12, fontFamily: FONT } },
        grid: { left: 56, right: 60, top: 44, bottom: 32 },
        xAxis: Object.assign(baseAxis(), { type: 'category', data: ['2021', '2022', '2023', '2024', '2025', '2026E'] }),
        yAxis: [
          Object.assign(baseAxis(), { type: 'value', name: '亿元', nameTextStyle: { color: MUTED, fontSize: 11 } }),
          Object.assign(baseAxis(), { type: 'value', name: '净利率%', nameTextStyle: { color: MUTED, fontSize: 11 }, splitLine: { show: false }, max: 25 })
        ],
        series: [
          { name: '营业收入', type: 'bar', data: [39.6, 40.6, 55.4, 62.38, 77.68, 86], barWidth: '42%', itemStyle: { color: ACCENT },
            label: { show: true, position: 'top', fontSize: 10, color: INK, fontFamily: FONT } },
          { name: '归母净利润', type: 'bar', data: [3.75, 4.7, 7.23, 11.56, 16.01, 15.5], barWidth: '42%', itemStyle: { color: ACCENT2 },
            label: { show: true, position: 'top', fontSize: 10, color: INK, fontFamily: FONT } },
          { name: '净利率', type: 'line', yAxisIndex: 1, data: [9.5, 11.6, 13.0, 18.5, 20.6, 18.0], symbol: 'circle', symbolSize: 6, lineStyle: { color: GOLD, width: 2 }, itemStyle: { color: GOLD } }
        ]
      };
    },

    /* 图2 2014-2016 实证周期 */
    'chart-cycle': function (el) {
      return {
        tooltip: mkTooltip(''),
        legend: { top: 0, textStyle: { color: INK, fontSize: 12, fontFamily: FONT } },
        grid: { left: 56, right: 62, top: 44, bottom: 32 },
        xAxis: Object.assign(baseAxis(), { type: 'category', data: ['2014', '2015', '2016'] }),
        yAxis: [
          Object.assign(baseAxis(), { type: 'value', name: '亿元', nameTextStyle: { color: MUTED, fontSize: 11 } }),
          Object.assign(baseAxis(), { type: 'value', name: '美元/桶', nameTextStyle: { color: MUTED, fontSize: 11 }, splitLine: { show: false }, max: 120 })
        ],
        series: [
          { name: '营业收入', type: 'bar', data: [27.34, 21.5, 20.45], barWidth: '26%', itemStyle: { color: ACCENT },
            label: { show: true, position: 'top', fontSize: 10, color: INK, fontFamily: FONT } },
          { name: '利润总额', type: 'bar', data: [6.85, 4.2, 2.6], barWidth: '26%', itemStyle: { color: ACCENT2 },
            label: { show: true, position: 'top', fontSize: 10, color: INK, fontFamily: FONT } },
          { name: '布伦特油价（均价）', type: 'line', yAxisIndex: 1, data: [98.9, 52.4, 43.7], symbol: 'circle', symbolSize: 7, lineStyle: { color: GOLD, width: 2.5 }, itemStyle: { color: GOLD },
            label: { show: true, position: 'top', fontSize: 10, color: MUTED, fontFamily: FONT, formatter: '{c} $' } }
        ]
      };
    },

    /* 图3 全球上游油气资本开支三情景指数 */
    'chart-capex': function (el) {
      return {
        tooltip: mkTooltip(''),
        legend: { top: 0, textStyle: { color: INK, fontSize: 12, fontFamily: FONT } },
        grid: { left: 56, right: 40, top: 44, bottom: 32 },
        xAxis: Object.assign(baseAxis(), { type: 'category', data: ['2026', '2027', '2028', '2029', '2030'] }),
        yAxis: Object.assign(baseAxis(), { type: 'value', name: '指数（2026=100）', nameTextStyle: { color: MUTED, fontSize: 11 }, min: 60, max: 125 }),
        series: [
          { name: '乐观：投资周期再上行', type: 'line', data: [100, 104, 108, 112, 116], symbol: 'circle', symbolSize: 6, lineStyle: { color: ACCENT, width: 2.5 }, itemStyle: { color: ACCENT }, areaStyle: { color: 'rgba(30,110,84,0.06)' } },
          { name: '基准：高位平台震荡', type: 'line', data: [100, 101, 102, 102.5, 103], symbol: 'circle', symbolSize: 6, lineStyle: { color: BLUE, width: 2.5 }, itemStyle: { color: BLUE } },
          { name: '温和下滑：-15%左右', type: 'line', data: [100, 97, 93, 89, 86], symbol: 'circle', symbolSize: 6, lineStyle: { color: GOLD, width: 2.5 }, itemStyle: { color: GOLD } },
          { name: '深度下滑：-25%以上', type: 'line', data: [100, 93, 85, 78, 72], symbol: 'circle', symbolSize: 6, lineStyle: { color: ACCENT2, width: 2.5, type: 'dashed' }, itemStyle: { color: ACCENT2 } }
        ]
      };
    },

    /* 图4 三桶油 2025实际 vs 2026计划 */
    'chart-china': function (el) {
      return {
        tooltip: mkTooltip(' 亿元'),
        legend: { top: 0, textStyle: { color: INK, fontSize: 12, fontFamily: FONT } },
        grid: { left: 66, right: 30, top: 44, bottom: 32 },
        xAxis: Object.assign(baseAxis(), { type: 'category', data: ['中国石油', '中国石化', '中国海油'] }),
        yAxis: Object.assign(baseAxis(), { type: 'value', name: '亿元', nameTextStyle: { color: MUTED, fontSize: 11 } }),
        series: [
          { name: '2025年实际', type: 'bar', data: [2691, '-', 1205], barWidth: '30%', itemStyle: { color: ACCENT },
            label: { show: true, position: 'top', fontSize: 10, color: INK, fontFamily: FONT } },
          { name: '2026年计划（区间中枢）', type: 'bar', data: [2794, 1401, 1170], barWidth: '30%', itemStyle: { color: ACCENT2 },
            label: { show: true, position: 'top', fontSize: 10, color: INK, fontFamily: FONT } }
        ]
      };
    },

    /* 图5 capex下滑幅度 → 纽威营收/利润弹性 */
    'chart-elasticity': function (el) {
      return {
        tooltip: mkTooltip('%'),
        legend: { top: 0, textStyle: { color: INK, fontSize: 12, fontFamily: FONT } },
        grid: { left: 56, right: 30, top: 44, bottom: 32 },
        xAxis: Object.assign(baseAxis(), { type: 'category', data: ['capex -5%', 'capex -10%', 'capex -15%', 'capex -20%', 'capex -30%'] }),
        yAxis: Object.assign(baseAxis(), { type: 'value', name: '较基准变动%', nameTextStyle: { color: MUTED, fontSize: 11 }, max: 0, min: -60 }),
        series: [
          { name: '营业收入变动', type: 'bar', data: [-4.5, -9, -13.5, -18, -27], barWidth: '30%', itemStyle: { color: BLUE },
            label: { show: true, position: 'bottom', fontSize: 10, color: INK, fontFamily: FONT } },
          { name: '归母净利润变动', type: 'bar', data: [-9, -18, -27, -36, -54], barWidth: '30%', itemStyle: { color: ACCENT2 },
            label: { show: true, position: 'bottom', fontSize: 10, color: INK, fontFamily: FONT } }
        ]
      };
    },

    /* 图6 四情景利润路径与概率 */
    'chart-scenario': function (el) {
      return {
        tooltip: mkTooltip(' 亿元'),
        legend: { top: 0, textStyle: { color: INK, fontSize: 12, fontFamily: FONT } },
        grid: { left: 56, right: 30, top: 44, bottom: 44 },
        xAxis: Object.assign(baseAxis(), { type: 'category',
          data: ['S1 景气延续上行\n概率20%', 'S2 高位平台\n概率40%', 'S3 温和下滑\n概率25%', 'S4 深度下滑\n概率15%'],
          axisLabel: { color: MUTED, fontSize: 11, fontFamily: FONT, interval: 0, lineHeight: 16 } }),
        yAxis: Object.assign(baseAxis(), { type: 'value', name: '归母净利润（亿元）', nameTextStyle: { color: MUTED, fontSize: 11 } }),
        series: [
          { name: '2027E', type: 'bar', data: [21, 20.5, 18, 15], barWidth: '28%', itemStyle: { color: ACCENT },
            label: { show: true, position: 'top', fontSize: 10, color: INK, fontFamily: FONT } },
          { name: '2030E（区间中值）', type: 'bar', data: [33, 28, 20, 13], barWidth: '28%', itemStyle: { color: ACCENT2 },
            label: { show: true, position: 'top', fontSize: 10, color: INK, fontFamily: FONT } },
          { name: '2025年实际（16.01）', type: 'line', data: [16.01, 16.01, 16.01, 16.01], symbol: 'none', lineStyle: { color: GOLD, width: 2, type: 'dashed' }, itemStyle: { color: GOLD } }
        ]
      };
    }
  };

  function init(id, el) {
    el = el || document.getElementById(id);
    if (!el || !window.echarts || !registry[id]) return null;
    var chart = window.echarts.init(el, null, { renderer: 'svg' });
    chart.setOption(registry[id](el));
    window.addEventListener('resize', function () { chart.resize(); });
    return chart;
  }

  function boot() {
    document.querySelectorAll('[data-chart]').forEach(function (el) { init(el.getAttribute('data-chart'), el); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
