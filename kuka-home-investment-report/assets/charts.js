(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();
  var fontMono = 'IBMPlexMono, PingFang SC, monospace';

  var charts = [];

  function mk(id, option) {
    var el = document.getElementById(id);
    if (!el) return;
    var c = echarts.init(el, null, { renderer: 'svg' });
    c.setOption(option);
    charts.push(c);
  }

  var baseAxis = {
    axisLine: { lineStyle: { color: rule } },
    axisLabel: { color: muted, fontSize: 11 },
    splitLine: { lineStyle: { color: rule, type: 'dashed' } }
  };

  // ---------- 图1: 2024分品类结构 (饼图) ----------
  mk('chart-mix', {
    animation: false,
    tooltip: { trigger: 'item', appendToBody: true, formatter: '{b}<br/>{c}亿元 ({d}%)' },
    legend: { bottom: 0, textStyle: { color: muted, fontSize: 12 } },
    series: [{
      type: 'pie',
      radius: ['38%', '62%'],
      center: ['50%', '44%'],
      label: { color: ink, fontSize: 12, formatter: '{b}\n{d}%' },
      labelLine: { lineStyle: { color: rule } },
      itemStyle: { borderColor: bg2, borderWidth: 2 },
      data: [
        { name: '沙发', value: 102.04, itemStyle: { color: accent } },
        { name: '卧室产品(床垫软床)', value: 32.50, itemStyle: { color: accent + 'cc' } },
        { name: '集成产品', value: 24.37, itemStyle: { color: accent2 } },
        { name: '定制家具', value: 9.92, itemStyle: { color: accent2 + 'bb' } },
        { name: '信息技术服务', value: 7.02, itemStyle: { color: muted } },
        { name: '其他', value: 8.95, itemStyle: { color: muted + '99' } }
      ]
    }]
  });

  // ---------- 图2: 营收与净利趋势 ----------
  mk('chart-fin', {
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true },
    legend: { top: 0, textStyle: { color: muted, fontSize: 12 } },
    grid: { top: 40, left: 60, right: 60, bottom: 30 },
    xAxis: Object.assign({ type: 'category', data: ['2022', '2023', '2024', '2025', '2026Q1-3'] }, baseAxis, { splitLine: { show: false } }),
    yAxis: [
      Object.assign({ type: 'value', name: '亿元', max: 220 }, baseAxis),
      Object.assign({ type: 'value', name: '同比%', min: -15, max: 15, axisLabel: { color: muted, fontSize: 11, formatter: '{value}%' } }, baseAxis)
    ],
    series: [
      { name: '营业收入(亿元)', type: 'bar', barWidth: 34, itemStyle: { color: accent }, data: [180.10, 192.12, 184.80, 200.56, 147.28] },
      { name: '归母净利润(亿元)', type: 'bar', barWidth: 34, itemStyle: { color: accent2 }, data: [18.12, 20.06, 14.17, 17.90, 13.87] },
      { name: '营收同比(%)', type: 'line', yAxisIndex: 1, symbolSize: 7, lineStyle: { color: ink, width: 2 }, itemStyle: { color: ink }, data: [-1.81, 6.67, -3.81, 8.53, -1.89] }
    ]
  });

  // ---------- 图3: 盈利能力趋势 ----------
  mk('chart-margin', {
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true, valueFormatter: function (v) { return v + '%'; } },
    legend: { top: 0, textStyle: { color: muted, fontSize: 12 } },
    grid: { top: 40, left: 60, right: 30, bottom: 30 },
    xAxis: Object.assign({ type: 'category', data: ['2022', '2023', '2024', '2025', '2026Q1-3'] }, baseAxis, { splitLine: { show: false } }),
    yAxis: Object.assign({ type: 'value', min: 5, max: 35, axisLabel: { color: muted, fontSize: 11, formatter: '{value}%' } }, baseAxis),
    series: [
      { name: '毛利率', type: 'line', symbolSize: 7, lineStyle: { width: 2.5, color: accent }, itemStyle: { color: accent }, data: [30.83, 32.82, 32.72, 32.8, 32.4] },
      { name: '归母净利率', type: 'line', symbolSize: 7, lineStyle: { width: 2.5, color: accent2 }, itemStyle: { color: accent2 }, data: [10.06, 10.44, 7.83, 8.92, 9.41] },
      { name: '加权ROE', type: 'line', symbolSize: 7, lineStyle: { width: 2, type: 'dashed', color: ink }, itemStyle: { color: ink }, connectNulls: false, data: [21.61, 21.87, 14.72, 17.68, null] }
    ]
  });

  // ---------- 图4: DCF敏感性热力图 ----------
  var sensW = ['WACC 8.0%', 'WACC 8.5%', 'WACC 9.0%', 'WACC 9.5%', 'WACC 10.0%'];
  var sensG = ['永续g 1.0%', '永续g 1.5%', '永续g 2.0%', '永续g 2.5%'];
  var sensData = [
    [0, 0, 28.4], [0, 1, 30.1], [0, 2, 32.0], [0, 3, 34.4],
    [1, 0, 26.4], [1, 1, 27.9], [1, 2, 29.6], [1, 3, 31.5],
    [2, 0, 24.8], [2, 1, 26.0], [2, 2, 27.4], [2, 3, 29.1],
    [3, 0, 23.3], [3, 1, 24.4], [3, 2, 25.6], [3, 3, 27.0],
    [4, 0, 22.0], [4, 1, 22.9], [4, 2, 24.0], [4, 3, 25.2]
  ];
  mk('chart-sens', {
    animation: false,
    tooltip: { appendToBody: true, formatter: function (p) { return sensW[p.value[0]] + ' × ' + sensG[p.value[1]] + '<br/>每股价值：<b>' + p.value[2] + '元</b>'; } },
    grid: { top: 30, left: 100, right: 110, bottom: 40 },
    xAxis: { type: 'category', data: sensG, splitArea: { show: false }, axisLabel: { color: muted, fontSize: 11 }, axisLine: { lineStyle: { color: rule } } },
    yAxis: { type: 'category', data: sensW, splitArea: { show: false }, axisLabel: { color: muted, fontSize: 11 }, axisLine: { lineStyle: { color: rule } } },
    visualMap: {
      min: 22, max: 34.4, calculable: true,
      orient: 'vertical', right: 8, top: 'center',
      inRange: { color: [bg2, accent + '66', accent] },
      textStyle: { color: muted, fontSize: 10 },
      formatter: function (v) { return v.toFixed(0) + '元'; }
    },
    series: [{
      type: 'heatmap',
      data: sensData,
      label: { show: true, color: ink, fontSize: 12, fontFamily: fontMono, formatter: function (p) { return p.value[2].toFixed(1); } },
      itemStyle: { borderColor: bg2, borderWidth: 3 }
    }]
  });

  // ---------- 图5: 可比公司PE ----------
  mk('chart-peers', {
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true, formatter: function (ps) { return ps[0].name + '：PE(TTM) ' + ps[0].value + '倍'; } },
    grid: { top: 20, left: 60, right: 40, bottom: 30 },
    xAxis: Object.assign({ type: 'value', max: 28 }, baseAxis),
    yAxis: { type: 'category', data: ['敏华控股(H股)', '顾家家居', '索菲亚', '欧派家居', '慕思股份'], axisLabel: { color: ink, fontSize: 12 }, axisLine: { lineStyle: { color: rule } } },
    series: [{
      type: 'bar',
      barWidth: 22,
      label: { show: true, position: 'right', color: ink, fontFamily: fontMono, formatter: '{c}x' },
      itemStyle: { color: function (p) { return p.name === '顾家家居' ? accent : muted + '99'; } },
      data: [5.0, 13.96, 18.62, 22.46, 24.66]
    }]
  });

  // ---------- 图6: 估值阶梯 ----------
  var ladderItems = [
    { n: 'PB 1.5x（悲观支撑）', v: 20.7, c: accent2 },
    { n: 'DCF保守情景', v: 21.0, c: accent2 },
    { n: '52周低点（2026-07）', v: 21.23, c: accent2 },
    { n: 'PB 1.8x（现价水平）', v: 24.8, c: muted },
    { n: 'PE 13x（现价隐含）', v: 25.0, c: muted },
    { n: 'DCF中性情景', v: 27.4, c: accent },
    { n: 'PB 2.0x（合理中枢）', v: 27.6, c: accent },
    { n: 'PE 15x（历史中枢）', v: 28.8, c: accent },
    { n: '股息率4%对应价', v: 30.0, c: accent },
    { n: 'PB 2.2x', v: 30.3, c: accent },
    { n: '浙商证券DCF目标', v: 31.6, c: accent + 'aa' },
    { n: 'PE 17x（估值修复）', v: 32.7, c: accent + 'aa' },
    { n: '华泰证券目标价', v: 33.66, c: accent + '88' },
    { n: 'DCF乐观情景', v: 39.5, c: accent + '66' }
  ];
  var markLine = {
    symbol: 'none',
    lineStyle: { color: ink, type: 'solid', width: 1.5 },
    label: { position: 'insideEndTop', color: ink, fontSize: 11, fontWeight: 700, formatter: '现价 24.68元' },
    data: [{ xAxis: 24.68 }]
  };
  mk('chart-ladder', {
    animation: false,
    tooltip: { trigger: 'item', appendToBody: true, formatter: function (p) { return p.name + '：<b>' + p.value + '元</b>'; } },
    grid: { top: 20, left: 170, right: 60, bottom: 30 },
    xAxis: Object.assign({ type: 'value', min: 18, max: 42, axisLabel: { color: muted, fontSize: 11, formatter: '{value}元' } }, baseAxis),
    yAxis: { type: 'category', inverse: true, data: ladderItems.map(function (d) { return d.n; }), axisLabel: { color: ink, fontSize: 11.5 }, axisLine: { lineStyle: { color: rule } } },
    series: [{
      type: 'bar',
      barWidth: 16,
      markLine: markLine,
      label: { show: true, position: 'right', color: ink, fontFamily: fontMono, fontSize: 11, formatter: '{c}元' },
      itemStyle: { color: function (p) { return ladderItems[p.dataIndex].c; } },
      data: ladderItems.map(function (d) { return d.v; })
    }]
  });

  window.addEventListener('resize', function () {
    charts.forEach(function (c) { c.resize(); });
  });
})();
