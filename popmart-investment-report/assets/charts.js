/* popmart-investment-report charts (ECharts) + mermaid init */
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

  // --- Chart 1: 主要IP收入 2026H1 (horizontal bar) ---
  var ipNames = ['THE MONSTERS', '星星人', 'CRYBABY', 'DIMOO', 'SKULLPANDA', 'HIRONO小野', 'MOLLY'];
  var ipVals = [44.5, 26.5, 16.3, 16.2, 15.5, 10.1, 9.0];
  var ipGrowth = ['-7.5%', '+580.6%', '+34.0%', '+46.5%', '+27.1%', '+38.0%', '-33.6%'];
  var ipNeg = [true, false, false, false, false, false, true];
  var chartIP = echarts.init(document.getElementById('chart-ip'), null, { renderer: 'svg' });
  chartIP.setOption({
    animation: false,
    tooltip: tooltip({ trigger: 'item', formatter: function (p) {
      return p.name + '<br/>2026H1收入：<b>' + ipVals[p.dataIndex] + ' 亿元</b><br/>同比：' + ipGrowth[p.dataIndex];
    }}),
    grid: { left: 130, right: 90, top: 10, bottom: 30 },
    xAxis: Object.assign(baseAxis(), { type: 'value', name: '亿元', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
    yAxis: Object.assign(baseAxis(), { type: 'category', data: ipNames.slice().reverse().map(function (n, i) { return ipNames[ipNames.length - 1 - i]; }), axisLabel: { color: ink, fontSize: 12 } }),
    series: [{
      type: 'bar',
      barWidth: '55%',
      data: ipVals.slice().reverse().map(function (v, i) {
        var idx = ipVals.length - 1 - i;
        return { value: v, itemStyle: { color: ipNeg[idx] ? accent2 : accent, borderRadius: idx === 0 ? [0, 4, 4, 0] : 0 } };
      }),
      label: {
        show: true, position: 'right', color: ink, fontSize: 11, fontFamily: 'IBMPlexMono',
        formatter: function (p) { return p.value + ' (' + ipGrowth[ipVals.length - 1 - p.dataIndex] + ')'; }
      }
    }]
  });
  window.addEventListener('resize', function () { chartIP.resize(); });

  // --- Chart 2: 营收/净利润/增速 (2022-2026H1) ---
  var years = ['2022', '2023', '2024', '2025', '2026H1'];
  var revenue = [46.17, 63.01, 130.40, 371.20, 171.70];
  var netProfit = [4.76, 10.89, 31.25, 127.76, 50.38];
  var revGrowth = [2.8, 36.5, 106.9, 184.7, 23.8];
  var chartFin = echarts.init(document.getElementById('chart-fin'), null, { renderer: 'svg' });
  chartFin.setOption({
    animation: false,
    color: palette,
    legend: { top: 0, textStyle: { color: muted, fontSize: 12 } },
    tooltip: tooltip({}),
    grid: { left: 56, right: 56, top: 40, bottom: 30 },
    xAxis: Object.assign(baseAxis(), { type: 'category', data: years, axisLabel: { color: ink, fontSize: 12 } }),
    yAxis: [
      Object.assign(baseAxis(), { type: 'value', name: '亿元', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
      Object.assign(baseAxis(), { type: 'value', name: '同比%', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: false } })
    ],
    series: [
      { name: '营业收入', type: 'bar', barMaxWidth: 34, data: revenue, itemStyle: { color: accent, borderRadius: [3, 3, 0, 0] } },
      { name: '归母净利润', type: 'bar', barMaxWidth: 22, data: netProfit, itemStyle: { color: accent2, borderRadius: [3, 3, 0, 0] } },
      { name: '营收同比增速', type: 'line', yAxisIndex: 1, data: revGrowth, symbol: 'circle', symbolSize: 7, lineStyle: { width: 2.5, color: '#a06a2c' }, itemStyle: { color: '#a06a2c' },
        label: { show: true, color: '#a06a2c', fontSize: 11, fontFamily: 'IBMPlexMono', formatter: '{c}%' } }
    ]
  });
  window.addEventListener('resize', function () { chartFin.resize(); });

  // --- Chart 3: 毛利率/净利率 ---
  var chartMargin = echarts.init(document.getElementById('chart-margin'), null, { renderer: 'svg' });
  chartMargin.setOption({
    animation: false,
    color: palette,
    legend: { top: 0, textStyle: { color: muted, fontSize: 12 } },
    tooltip: tooltip({ valueFormatter: function (v) { return v + '%'; } }),
    grid: { left: 56, right: 30, top: 40, bottom: 30 },
    xAxis: Object.assign(baseAxis(), { type: 'category', data: years, axisLabel: { color: ink, fontSize: 12 } }),
    yAxis: Object.assign(baseAxis(), { type: 'value', min: 0, max: 80, name: '%', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
    series: [
      { name: '毛利率', type: 'line', data: [57.5, 61.3, 66.8, 72.1, 69.7], symbol: 'circle', symbolSize: 7, lineStyle: { width: 2.5 }, itemStyle: { color: accent },
        label: { show: true, color: accent, fontSize: 11, fontFamily: 'IBMPlexMono', formatter: '{c}%' }, areaStyle: { color: accent + '14' } },
      { name: '归母净利率', type: 'line', data: [10.3, 17.3, 24.0, 34.4, 29.3], symbol: 'circle', symbolSize: 7, lineStyle: { width: 2.5 }, itemStyle: { color: accent2 },
        label: { show: true, color: accent2, fontSize: 11, fontFamily: 'IBMPlexMono', formatter: '{c}%' } }
    ]
  });
  window.addEventListener('resize', function () { chartMargin.resize(); });

  // --- Chart 4: 存货 ---
  var chartInv = echarts.init(document.getElementById('chart-inventory'), null, { renderer: 'svg' });
  chartInv.setOption({
    animation: false,
    color: palette,
    legend: { top: 0, textStyle: { color: muted, fontSize: 12 } },
    tooltip: tooltip({}),
    grid: { left: 56, right: 56, top: 40, bottom: 30 },
    xAxis: Object.assign(baseAxis(), { type: 'category', data: ['2024年末', '2025年末', '2026年6月末'], axisLabel: { color: ink, fontSize: 12 } }),
    yAxis: [
      Object.assign(baseAxis(), { type: 'value', name: '亿元', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
      Object.assign(baseAxis(), { type: 'value', name: '天', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: false } })
    ],
    series: [
      { name: '存货余额', type: 'bar', barMaxWidth: 44, data: [15.25, 54.73, 61.02], itemStyle: { color: accent, borderRadius: [3, 3, 0, 0] },
        label: { show: true, position: 'top', color: ink, fontSize: 11, fontFamily: 'IBMPlexMono' } },
      { name: '存货周转天数', type: 'line', yAxisIndex: 1, data: [102, 123, 201], symbol: 'circle', symbolSize: 8, lineStyle: { width: 2.5 }, itemStyle: { color: accent2 },
        label: { show: true, color: accent2, fontSize: 11, fontFamily: 'IBMPlexMono', formatter: '{c}天' } }
    ]
  });
  window.addEventListener('resize', function () { chartInv.resize(); });

  // --- Chart 5: 区域结构 (stacked 100%) ---
  var chartRegion = echarts.init(document.getElementById('chart-region'), null, { renderer: 'svg' });
  var regionYears = ['2023', '2024', '2025', '2026H1'];
  var cnAbs = [52.35, 79.70, 208.50, 122.00];
  var ovAbs = [10.66, 50.70, 162.70, 49.80];
  chartRegion.setOption({
    animation: false,
    color: [accent, accent2],
    legend: { top: 0, textStyle: { color: muted, fontSize: 12 } },
    tooltip: tooltip({ formatter: function (ps) {
      var s = ps[0].name + '<br/>';
      ps.forEach(function (p) {
        var abs = p.seriesName === '中国内地' ? cnAbs[p.dataIndex] : ovAbs[p.dataIndex];
        s += p.marker + p.seriesName + '：' + p.value + '%（' + abs + ' 亿元）<br/>';
      });
      return s;
    }}),
    grid: { left: 56, right: 30, top: 40, bottom: 30 },
    xAxis: Object.assign(baseAxis(), { type: 'category', data: regionYears, axisLabel: { color: ink, fontSize: 12 } }),
    yAxis: Object.assign(baseAxis(), { type: 'value', max: 100, name: '占比%', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
    series: [
      { name: '中国内地', type: 'bar', stack: 'total', barMaxWidth: 48, data: [83.0, 61.1, 56.0, 71.1], itemStyle: { color: accent },
        label: { show: true, color: '#fff', fontSize: 11, fontFamily: 'IBMPlexMono', formatter: '{c}%' } },
      { name: '港澳台及海外', type: 'bar', stack: 'total', barMaxWidth: 48, data: [17.0, 38.9, 43.8, 29.0], itemStyle: { color: accent2 },
        label: { show: true, color: '#fff', fontSize: 11, fontFamily: 'IBMPlexMono', formatter: '{c}%' } }
    ]
  });
  window.addEventListener('resize', function () { chartRegion.resize(); });

  // --- Chart 6: 2026Q3 区域收益同比 ---
  var chartQ3 = echarts.init(document.getElementById('chart-q3'), null, { renderer: 'svg' });
  var q3Cats = ['整体', '中国内地', '内地线下渠道', '内地线上渠道', '亚太', '欧洲及其他', '美洲'];
  var q3Mid = [-47.5, -27.5, -7.5, -47.5, -67.5, -52.5, -72.5];
  var q3Range = ['下降45%–50%', '下降25%–30%', '下降5%–10%', '下降45%–50%', '下降65%–70%', '下降50%–55%', '下降70%–75%'];
  chartQ3.setOption({
    animation: false,
    tooltip: tooltip({ trigger: 'item', formatter: function (p) { return p.name + '<br/>公告区间：' + q3Range[q3Cats.length - 1 - p.dataIndex]; } }),
    grid: { left: 70, right: 90, top: 20, bottom: 30 },
    xAxis: Object.assign(baseAxis(), { type: 'value', min: -85, max: 0, name: '%', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
    yAxis: Object.assign(baseAxis(), { type: 'category', data: q3Cats.slice().reverse(), axisLabel: { color: ink, fontSize: 12 } }),
    series: [{
      type: 'bar',
      barWidth: '55%',
      data: q3Mid.slice().reverse().map(function (v) { return { value: v, itemStyle: { color: accent2, borderRadius: [4, 0, 0, 4] } }; }),
      label: { show: true, position: 'left', color: accent2, fontSize: 11, fontFamily: 'IBMPlexMono', formatter: function (p) { return p.value + '%'; } }
    }]
  });
  window.addEventListener('resize', function () { chartQ3.resize(); });

  // --- Chart 7: 中国潮玩市场规模 ---
  var chartMarket = echarts.init(document.getElementById('chart-market'), null, { renderer: 'svg' });
  var mkYears = ['2019', '2024', '2025', '2030E'];
  var mkVals = [207, 587, 875, 2133];
  var mkColors = [accent + '99', accent, accent, accent2];
  chartMarket.setOption({
    animation: false,
    tooltip: tooltip({ trigger: 'item', formatter: function (p) { return p.name + '：约 ' + p.value + ' 亿元'; } }),
    grid: { left: 70, right: 40, top: 30, bottom: 30 },
    xAxis: Object.assign(baseAxis(), { type: 'category', data: mkYears, axisLabel: { color: ink, fontSize: 12 } }),
    yAxis: Object.assign(baseAxis(), { type: 'value', name: '亿元', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
    series: [{
      type: 'bar',
      barMaxWidth: 56,
      data: mkVals.map(function (v, i) { return { value: v, itemStyle: { color: mkColors[i], borderRadius: [3, 3, 0, 0] } }; }),
      label: { show: true, position: 'top', color: ink, fontSize: 12, fontFamily: 'IBMPlexMono' }
    }],
    graphic: [
      { type: 'text', left: '18%', top: 46, style: { text: '2019–2024 CAGR ≈ 23.2%', fill: muted, fontSize: 12 } },
      { type: 'text', left: '58%', top: 30, style: { text: '2024–2030E CAGR ≈ 20.9%', fill: accent2, fontSize: 12, fontWeight: 'bold' } }
    ]
  });
  window.addEventListener('resize', function () { chartMarket.resize(); });

  // --- Chart 8: 2025 中国潮玩份额 ---
  var chartShare = echarts.init(document.getElementById('chart-share'), null, { renderer: 'svg' });
  chartShare.setOption({
    animation: false,
    tooltip: tooltip({ trigger: 'item', formatter: function (p) { return p.name + '：' + p.value + '%'; } }),
    legend: { bottom: 0, textStyle: { color: muted, fontSize: 12 } },
    series: [{
      type: 'pie',
      radius: ['42%', '68%'],
      center: ['50%', '44%'],
      label: { color: ink, fontSize: 12, formatter: '{b}\n{d}%' },
      labelLine: { lineStyle: { color: rule } },
      data: [
        { value: 21.8, name: '泡泡玛特', itemStyle: { color: accent } },
        { value: 4.8, name: 'TOP TOY', itemStyle: { color: accent2 } },
        { value: 5.9, name: '其余CR3成员（差额推算）', itemStyle: { color: '#a06a2c' } },
        { value: 67.5, name: '长尾及其他品牌', itemStyle: { color: muted + '99' } }
      ]
    }]
  });
  window.addEventListener('resize', function () { chartShare.resize(); });

  // --- Mermaid init ---
  if (window.mermaid) {
    mermaid.initialize({ startOnLoad: false, theme: 'neutral', securityLevel: 'loose' });
    mermaid.run({ querySelector: 'pre.mermaid' });
  }
})();
