/* tencent-investment-report charts (ECharts) + mermaid init */
(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();
  var palette = [accent, accent2, muted, accent + '99', accent2 + '99'];

  function baseAxis() {
    return {
      axisLine: { lineStyle: { color: rule } },
      axisTick: { show: false },
      axisLabel: { color: muted, fontSize: 11 },
      splitLine: { show: false }
    };
  }
  function tooltip(extra) {
    return Object.assign({
      trigger: 'axis',
      appendToBody: true,
      backgroundColor: bg2,
      borderColor: rule,
      textStyle: { color: ink, fontSize: 12 },
      extraCssText: 'box-shadow:0 2px 8px rgba(0,0,0,.12);'
    }, extra || {});
  }

  // --- Chart 1: 分部收入堆叠 (2022-2026H1) ---
  var segYears = ['2022', '2023', '2024', '2025', '2026H1'];
  var segData = {
    '本土游戏': [1235, 1261, 1397, 1642, 927],
    '国际游戏': [469, 532, 580, 774, 374],
    '社交网络及其他': [1145.5, 1244.2, 1291.6, 1357.6, 692.4],
    '营销服务': [827, 1015, 1214, 1449.7, 817.4],
    '金融科技及企业服务': [1869, 2038, 2120, 2294.4, 1201.7]
  };
  var segColors = [accent, accent + 'cc', muted, accent2, accent2 + '99'];
  var chartSeg = echarts.init(document.getElementById('chart-seg'), null, { renderer: 'svg' });
  chartSeg.setOption({
    animation: false,
    color: segColors,
    legend: { top: 0, textStyle: { color: muted, fontSize: 12 } },
    tooltip: tooltip({}),
    grid: { left: 56, right: 24, top: 40, bottom: 30 },
    xAxis: Object.assign(baseAxis(), { type: 'category', data: segYears, axisLabel: { color: ink, fontSize: 12 } }),
    yAxis: Object.assign(baseAxis(), { type: 'value', name: '亿元', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
    series: Object.keys(segData).map(function (k) {
      return { name: k, type: 'bar', stack: 'total', barMaxWidth: 44, data: segData[k].map(function (v) { return Math.round(v * 10) / 10; }) };
    })
  });
  window.addEventListener('resize', function () { chartSeg.resize(); });

  // --- Chart 2: 营收/Non-IFRS净利/增速 (2020-2026E) ---
  var finYears = ['2020', '2021', '2022', '2023', '2024', '2025', '2026E'];
  var revenue = [4820.64, 5601.18, 5545.52, 6090.15, 6602.57, 7517.66, 8250];
  var nifProfit = [1227.35, 1237.88, 1155.67, 1576.88, 2227.03, 2596.26, 2657];
  var revGrowth = [28, 16, -1, 10, 8, 14, 10];
  var chartFin = echarts.init(document.getElementById('chart-fin'), null, { renderer: 'svg' });
  chartFin.setOption({
    animation: false,
    color: palette,
    legend: { top: 0, textStyle: { color: muted, fontSize: 12 } },
    tooltip: tooltip({}),
    grid: { left: 60, right: 56, top: 40, bottom: 30 },
    xAxis: Object.assign(baseAxis(), { type: 'category', data: finYears, axisLabel: { color: ink, fontSize: 12 } }),
    yAxis: [
      Object.assign(baseAxis(), { type: 'value', name: '亿元', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
      Object.assign(baseAxis(), { type: 'value', name: '同比%', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: false } })
    ],
    series: [
      { name: '营业收入', type: 'bar', barMaxWidth: 34, data: revenue, itemStyle: { color: accent, borderRadius: [3, 3, 0, 0] } },
      { name: 'Non-IFRS归母净利', type: 'bar', barMaxWidth: 22, data: nifProfit, itemStyle: { color: accent2, borderRadius: [3, 3, 0, 0] } },
      { name: '营收同比增速', type: 'line', yAxisIndex: 1, data: revGrowth, symbol: 'circle', symbolSize: 7, lineStyle: { width: 2.5, color: muted }, itemStyle: { color: muted } }
    ]
  });
  window.addEventListener('resize', function () { chartFin.resize(); });

  // --- Chart 3: 毛利率/净利率 ---
  var mgYears = ['2020', '2021', '2022', '2023', '2024', '2025', '2026H1'];
  var grossMargin = [46.0, 43.9, 43.0, 48.1, 52.9, 56.2, 57.5];
  var netMargin = [25.5, 22.1, 20.8, 25.9, 33.7, 34.5, 34.0];
  var chartMargin = echarts.init(document.getElementById('chart-margin'), null, { renderer: 'svg' });
  chartMargin.setOption({
    animation: false,
    color: palette,
    legend: { top: 0, textStyle: { color: muted, fontSize: 12 } },
    tooltip: tooltip({ valueFormatter: function (v) { return v + '%'; } }),
    grid: { left: 48, right: 24, top: 40, bottom: 30 },
    xAxis: Object.assign(baseAxis(), { type: 'category', data: mgYears, axisLabel: { color: ink, fontSize: 12 }, boundaryGap: false }),
    yAxis: Object.assign(baseAxis(), { type: 'value', min: 15, max: 62, axisLabel: { formatter: '{value}%', color: muted, fontSize: 11 }, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
    series: [
      { name: '毛利率', type: 'line', data: grossMargin, symbol: 'circle', symbolSize: 7, lineStyle: { width: 2.5, color: accent }, itemStyle: { color: accent }, label: { show: true, color: accent, fontSize: 11, fontFamily: 'IBMPlexMono', formatter: '{c}%' } },
      { name: 'Non-IFRS净利率', type: 'line', data: netMargin, symbol: 'circle', symbolSize: 7, lineStyle: { width: 2.5, color: accent2, type: 'dashed' }, itemStyle: { color: accent2 }, label: { show: true, color: accent2, fontSize: 11, fontFamily: 'IBMPlexMono', formatter: '{c}%' } }
    ]
  });
  window.addEventListener('resize', function () { chartMargin.resize(); });

  // --- Chart 4: 资本开支 ---
  var capexYears = ['2023', '2024', '2025', '2026H1'];
  var capex = [239, 767.6, 792.0, 847.7];
  var chartCapex = echarts.init(document.getElementById('chart-capex'), null, { renderer: 'svg' });
  chartCapex.setOption({
    animation: false,
    tooltip: tooltip({ trigger: 'item', formatter: function (p) { return p.name + '<br/>资本开支：<b>' + p.value + ' 亿元</b>'; } }),
    grid: { left: 60, right: 24, top: 20, bottom: 30 },
    xAxis: Object.assign(baseAxis(), { type: 'category', data: capexYears, axisLabel: { color: ink, fontSize: 12 } }),
    yAxis: Object.assign(baseAxis(), { type: 'value', name: '亿元', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
    series: [{
      type: 'bar', barMaxWidth: 56,
      data: capex.map(function (v, i) { return { value: v, itemStyle: { color: i >= 3 ? accent2 : accent, borderRadius: [3, 3, 0, 0] } }; }),
      label: { show: true, position: 'top', color: ink, fontSize: 11, fontFamily: 'IBMPlexMono', formatter: '{c}' }
    }]
  });
  window.addEventListener('resize', function () { chartCapex.resize(); });

  // --- Chart 5: 回购与股息 ---
  var retYears = ['2021', '2022', '2023', '2024', '2025', '2026E'];
  var buyback = [26, 338, 494, 1120, 800, 380];
  var dps = [null, 2.40, 3.40, 4.50, 5.30, null];
  var chartReturn = echarts.init(document.getElementById('chart-return'), null, { renderer: 'svg' });
  chartReturn.setOption({
    animation: false,
    color: palette,
    legend: { top: 0, textStyle: { color: muted, fontSize: 12 } },
    tooltip: tooltip({}),
    grid: { left: 60, right: 52, top: 40, bottom: 30 },
    xAxis: Object.assign(baseAxis(), { type: 'category', data: retYears, axisLabel: { color: ink, fontSize: 12 } }),
    yAxis: [
      Object.assign(baseAxis(), { type: 'value', name: '回购（亿港元）', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
      Object.assign(baseAxis(), { type: 'value', name: '每股股息（港元）', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: false } })
    ],
    series: [
      { name: '年度回购金额', type: 'bar', barMaxWidth: 44, data: buyback, itemStyle: { color: accent, borderRadius: [3, 3, 0, 0] }, label: { show: true, position: 'top', color: ink, fontSize: 11, fontFamily: 'IBMPlexMono', formatter: '{c}' } },
      { name: '每股股息（财年度）', type: 'line', yAxisIndex: 1, data: dps, symbol: 'circle', symbolSize: 7, connectNulls: false, lineStyle: { width: 2.5, color: accent2 }, itemStyle: { color: accent2 } }
    ]
  });
  window.addEventListener('resize', function () { chartReturn.resize(); });

  // --- Chart 6: 可比公司PE ---
  var compNames = ['快手', '腾讯 Forward', '腾讯 TTM', 'Alphabet', '阿里巴巴', '网易', 'Meta'];
  var compVals = [6.5, 12.5, 14.0, 15.0, 18.0, 18.7, 21.0];
  var compIsTencent = [false, true, true, false, false, false, false];
  var chartComp = echarts.init(document.getElementById('chart-comp'), null, { renderer: 'svg' });
  chartComp.setOption({
    animation: false,
    tooltip: tooltip({ trigger: 'item', formatter: function (p) { return p.name + '<br/>PE：<b>' + p.value + 'x</b>'; } }),
    grid: { left: 110, right: 48, top: 14, bottom: 28 },
    xAxis: Object.assign(baseAxis(), { type: 'value', name: 'PE（倍）', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
    yAxis: Object.assign(baseAxis(), { type: 'category', data: compNames.slice().reverse(), axisLabel: { color: ink, fontSize: 12 } }),
    series: [{
      type: 'bar', barWidth: '55%',
      data: compVals.slice().reverse().map(function (v, i) {
        var idx = compVals.length - 1 - i;
        return { value: v, itemStyle: { color: compIsTencent[idx] ? accent : muted, borderRadius: [0, 4, 4, 0] } };
      }),
      label: { show: true, position: 'right', color: ink, fontSize: 11, fontFamily: 'IBMPlexMono', formatter: '{c}x' },
      markLine: {
        symbol: 'none', silent: true,
        lineStyle: { color: accent2, type: 'dashed', width: 1.5 },
        label: { color: accent2, fontSize: 11, formatter: '近10年中位数 24.4x' },
        data: [{ xAxis: 24.42 }]
      }
    }]
  });
  window.addEventListener('resize', function () { chartComp.resize(); });

  // --- Chart 7: 估值区间汇总 ---
  var valNames = ['DCF（三情景）', 'PE相对估值（三情景）', 'SOTP分部估值', '三法中性区间', '卖方一致目标价'];
  var valLow = [390, 350, 560, 540, 644];
  var valHigh = [700, 660, 610, 600, 644];
  var chartVal = echarts.init(document.getElementById('chart-valuation'), null, { renderer: 'svg' });
  chartVal.setOption({
    animation: false,
    tooltip: tooltip({ trigger: 'item', formatter: function (p) {
      var i = p.dataIndex;
      if (valLow[i] === valHigh[i]) return p.name + '：<b>' + valLow[i] + ' 港元</b>';
      return p.name + '：<b>' + valLow[i] + ' – ' + valHigh[i] + ' 港元</b>';
    } }),
    grid: { left: 150, right: 60, top: 16, bottom: 30 },
    xAxis: Object.assign(baseAxis(), { type: 'value', min: 300, max: 760, name: '港元/股', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
    yAxis: Object.assign(baseAxis(), { type: 'category', data: valNames.slice().reverse(), axisLabel: { color: ink, fontSize: 12 } }),
    series: [
      { type: 'bar', stack: 'range', barWidth: 22, silent: true, itemStyle: { color: 'transparent' }, data: valLow.slice().reverse() },
      {
        type: 'bar', stack: 'range', barWidth: 22,
        data: valHigh.slice().reverse().map(function (h, i) { return h - valLow[valLow.length - 1 - i]; }),
        itemStyle: { color: accent + 'cc', borderRadius: 3 },
        label: {
          show: true, position: 'right', color: ink, fontSize: 11, fontFamily: 'IBMPlexMono',
          formatter: function (p) {
            var i = p.dataIndex;
            var idx = valLow.length - 1 - i;
            if (valLow[idx] === valHigh[idx]) return String(valLow[idx]);
            return valLow[idx] + '–' + valHigh[idx];
          }
        },
        markLine: {
          symbol: 'none',
          lineStyle: { color: accent2, type: 'solid', width: 2 },
          label: { color: accent2, fontSize: 12, fontWeight: 700, formatter: '现价 398.8', position: 'insideEndTop' },
          data: [{ xAxis: 398.8 }]
        }
      }
    ]
  });
  window.addEventListener('resize', function () { chartVal.resize(); });

  // --- Chart 8: 风险矩阵散点 ---
  var risks = [
    { name: 'AI资本开支失控', p: 4, i: 3 },
    { name: '港股流动性风险', p: 3, i: 3 },
    { name: '游戏高基数回落', p: 4, i: 2 },
    { name: 'Prosus减持', p: 4, i: 2 },
    { name: '1260H升级禁令', p: 2, i: 4 },
    { name: '游戏监管反复', p: 2, i: 4 },
    { name: '字节竞争挤压', p: 3, i: 2 },
    { name: '出海剥离风险', p: 2, i: 3 },
    { name: '云份额边缘化', p: 2, i: 2 },
    { name: '数据合规处罚', p: 2, i: 1 }
  ];
  function riskColor(r) {
    var s = r.p * r.i;
    if (s >= 9) return accent2;
    if (s >= 6) return accent2 + '99';
    return muted;
  }
  var chartRisk = echarts.init(document.getElementById('chart-risk'), null, { renderer: 'svg' });
  chartRisk.setOption({
    animation: false,
    tooltip: tooltip({ trigger: 'item', formatter: function (p) { return p.data.name + '<br/>概率：' + p.data.p + '/5，影响：' + p.data.i + '/5<br/>风险评分：<b>' + (p.data.p * p.data.i) + '</b>'; } }),
    grid: { left: 56, right: 140, top: 24, bottom: 46 },
    xAxis: Object.assign(baseAxis(), {
      type: 'value', min: 1, max: 5, interval: 1, name: '发生概率 →',
      nameTextStyle: { color: muted, fontSize: 12 }, nameLocation: 'end',
      splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } },
      axisLabel: { color: muted, fontSize: 11, formatter: '{value}' }
    }),
    yAxis: Object.assign(baseAxis(), {
      type: 'value', min: 1, max: 5, interval: 1, name: '影响程度 →',
      nameTextStyle: { color: muted, fontSize: 12 },
      splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } },
      axisLabel: { color: muted, fontSize: 11, formatter: '{value}' }
    }),
    series: [{
      type: 'scatter',
      symbolSize: 22,
      data: risks.map(function (r) {
        return { value: [r.p, r.i], name: r.name, p: r.p, i: r.i, itemStyle: { color: riskColor(r), opacity: 0.92, borderColor: bg2, borderWidth: 2 } };
      }),
      label: {
        show: true, position: 'right', distance: 8, color: ink, fontSize: 11,
        formatter: function (p) { return p.data.name; }
      },
      markLine: {
        symbol: 'none', silent: true,
        lineStyle: { color: rule, type: 'solid', width: 1 },
        label: { show: false },
        data: [{ xAxis: 2.5 }, { yAxis: 2.5 }]
      }
    }]
  });
  window.addEventListener('resize', function () { chartRisk.resize(); });

  // --- Mermaid init ---
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({ startOnLoad: true, theme: 'neutral', securityLevel: 'loose' });
  }
})();
