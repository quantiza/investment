(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  function baseAxis() {
    return { axisLine: { lineStyle: { color: rule } }, axisTick: { show: false }, axisLabel: { color: muted, fontSize: 11 } };
  }
  function tooltip(extra) {
    return Object.assign({ trigger: 'axis', axisPointer: { type: 'shadow' }, appendToBody: true, textStyle: { color: ink, fontSize: 12 } }, extra || {});
  }

  // --- Mermaid init ---
  if (window.mermaid) {
    mermaid.initialize({ startOnLoad: true, theme: 'neutral', securityLevel: 'loose' });
  }

  // --- Chart 1: 营收对比（统一人民币口径） ---
  var chartRev = echarts.init(document.getElementById('chart-rev'), null, { renderer: 'svg' });
  chartRev.setOption({
    animation: false,
    tooltip: tooltip({ formatter: function (ps) { var s = ps[0].name; ps.forEach(function (p) { s += '<br/>' + p.marker + p.seriesName + '：' + p.value.toFixed(2) + ' 亿元'; }); return s; } }),
    legend: { top: 0, textStyle: { color: muted, fontSize: 12 } },
    grid: { left: 60, right: 30, top: 40, bottom: 40 },
    xAxis: Object.assign(baseAxis(), { type: 'category', data: ['2024年', '2025年', '2026H1'], axisLabel: { color: ink, fontSize: 12 } }),
    yAxis: Object.assign(baseAxis(), { type: 'value', name: '亿元（人民币）', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
    series: [
      { name: '智谱', type: 'bar', barMaxWidth: 48, itemStyle: { color: accent, borderRadius: [3, 3, 0, 0] }, data: [3.12, 7.24, 9.54], label: { show: true, position: 'top', color: accent, fontSize: 11, fontFamily: 'IBMPlexMono', formatter: '{c}' } },
      { name: 'MiniMax（折算）', type: 'bar', barMaxWidth: 48, itemStyle: { color: accent2, borderRadius: [3, 3, 0, 0] }, data: [2.18, 5.65, 8.33], label: { show: true, position: 'top', color: accent2, fontSize: 11, fontFamily: 'IBMPlexMono', formatter: '{c}' } }
    ]
  });
  window.addEventListener('resize', function () { chartRev.resize(); });

  // --- Chart 2: B端收入占比演变（堆叠100%） ---
  var chartMix = echarts.init(document.getElementById('chart-mix'), null, { renderer: 'svg' });
  chartMix.setOption({
    animation: false,
    tooltip: tooltip({ formatter: function (ps) { var s = ps[0].name; ps.forEach(function (p) { s += '<br/>' + p.marker + p.seriesName + '：' + p.value.toFixed(1) + '%'; }); return s; } }),
    legend: { top: 0, textStyle: { color: muted, fontSize: 12 } },
    grid: { left: 60, right: 30, top: 40, bottom: 40 },
    xAxis: Object.assign(baseAxis(), { type: 'category', data: ['智谱 2025', '智谱 2026H1', 'MiniMax 2025', 'MiniMax 2026H1'], axisLabel: { color: ink, fontSize: 11, interval: 0 } }),
    yAxis: Object.assign(baseAxis(), { type: 'value', max: 100, name: '%', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
    series: [
      { name: 'B端/开放平台', type: 'bar', stack: 'total', barMaxWidth: 60, itemStyle: { color: accent }, data: [26.3, 86.5, 30.3, 63.4], label: { show: true, position: 'inside', color: '#fff', fontSize: 11, fontFamily: 'IBMPlexMono', formatter: function (p) { return p.value.toFixed(1) + '%'; } } },
      { name: 'C端及其他', type: 'bar', stack: 'total', barMaxWidth: 60, itemStyle: { color: bg2, borderColor: rule, borderWidth: 1 }, data: [73.7, 13.5, 69.7, 36.6], label: { show: true, position: 'inside', color: muted, fontSize: 11, fontFamily: 'IBMPlexMono', formatter: function (p) { return p.value.toFixed(1) + '%'; } } }
    ]
  });
  window.addEventListener('resize', function () { chartMix.resize(); });

  // --- Chart 3: 上市以来股价表现（发行价=100） ---
  var chartPrice = echarts.init(document.getElementById('chart-price'), null, { renderer: 'svg' });
  chartPrice.setOption({
    animation: false,
    tooltip: tooltip({ trigger: 'item', formatter: function (p) { return p.seriesName + '<br/>' + p.name + '：发行价的 ' + (p.value == null ? '—' : Math.round(p.value) + '%'); } }),
    legend: { top: 0, textStyle: { color: muted, fontSize: 12 } },
    grid: { left: 60, right: 40, top: 40, bottom: 40 },
    xAxis: Object.assign(baseAxis(), { type: 'category', boundaryGap: false, data: ['上市首日', '3月', '4月', '6月峰值', '7月', '10月', '11月现价'], axisLabel: { color: ink, fontSize: 11 } }),
    yAxis: Object.assign(baseAxis(), { type: 'value', name: '指数（发行价=100）', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
    series: [
      {
        name: '智谱（02513.HK）', type: 'line', connectNulls: true, symbolSize: 7,
        itemStyle: { color: accent }, lineStyle: { color: accent, width: 2.5 },
        markLine: { symbol: 'none', silent: true, lineStyle: { color: muted, type: 'dashed' }, label: { color: muted, fontSize: 10, formatter: '发行价基准' }, data: [{ yAxis: 100 }] },
        data: [113, null, 861, 1144, 917, null, 429]
      },
      {
        name: 'MiniMax（00100.HK）', type: 'line', connectNulls: true, symbolSize: 7,
        itemStyle: { color: accent2 }, lineStyle: { color: accent2, width: 2.5 },
        data: [210, 806, null, null, 661, 99, 104]
      }
    ]
  });
  window.addEventListener('resize', function () { chartPrice.resize(); });

  // --- Chart 4: LLM MaaS 份额 ---
  var chartMaas = echarts.init(document.getElementById('chart-maas'), null, { renderer: 'svg' });
  var maasData = [
    { name: '阿里云', value: 46.8, color: muted + '99' },
    { name: '智谱', value: 10.8, color: accent },
    { name: '火山引擎', value: 10.0, color: muted + '99' },
    { name: '百度', value: 4.5, color: muted + '99' },
    { name: '其他（含MiniMax）', value: 27.9, color: bg2 }
  ];
  chartMaas.setOption({
    animation: false,
    tooltip: tooltip({ trigger: 'item', formatter: function (p) { return p.name + '：约 ' + p.value + '%'; } }),
    grid: { left: 120, right: 60, top: 20, bottom: 30 },
    xAxis: Object.assign(baseAxis(), { type: 'value', max: 50, name: '%', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
    yAxis: Object.assign(baseAxis(), { type: 'category', data: maasData.map(function (d) { return d.name; }).reverse(), axisLabel: { color: ink, fontSize: 12 } }),
    series: [{
      type: 'bar', barWidth: '55%',
      data: maasData.slice().reverse().map(function (d) { return { value: d.value, itemStyle: { color: d.color, borderRadius: [0, 3, 3, 0] } }; }),
      label: { show: true, position: 'right', color: ink, fontSize: 11, fontFamily: 'IBMPlexMono', formatter: '{c}%' }
    }]
  });
  window.addEventListener('resize', function () { chartMaas.resize(); });

  // --- Chart 5: P/ARR 估值对标 ---
  var chartMult = echarts.init(document.getElementById('chart-mult'), null, { renderer: 'svg' });
  var multData = [
    { name: 'OpenAI（全球锚）', value: 14.2, color: muted + '99' },
    { name: 'Anthropic（全球锚）', value: 14.8, color: muted + '99' },
    { name: '智谱', value: 17.4, color: accent },
    { name: 'MiniMax', value: 9.7, color: accent2 }
  ];
  chartMult.setOption({
    animation: false,
    tooltip: tooltip({ trigger: 'item', formatter: function (p) { return p.name + '：P/ARR ≈ ' + p.value.toFixed(1) + ' 倍'; } }),
    grid: { left: 130, right: 70, top: 20, bottom: 30 },
    xAxis: Object.assign(baseAxis(), { type: 'value', name: '倍', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
    yAxis: Object.assign(baseAxis(), { type: 'category', data: multData.map(function (d) { return d.name; }).reverse(), axisLabel: { color: ink, fontSize: 12 } }),
    series: [{
      type: 'bar', barWidth: '55%',
      data: multData.slice().reverse().map(function (d) { return { value: d.value, itemStyle: { color: d.color, borderRadius: [0, 3, 3, 0] } }; }),
      label: { show: true, position: 'right', color: ink, fontSize: 11, fontFamily: 'IBMPlexMono', formatter: '{c}x' }
    }]
  });
  window.addEventListener('resize', function () { chartMult.resize(); });

  // --- Chart 6: 六维评分雷达 ---
  var chartRadar = echarts.init(document.getElementById('chart-radar'), null, { renderer: 'svg' });
  chartRadar.setOption({
    animation: false,
    tooltip: { appendToBody: true, textStyle: { color: ink, fontSize: 12 } },
    legend: { top: 0, textStyle: { color: muted, fontSize: 12 } },
    radar: {
      indicator: [
        { name: '技术能力（20%）', max: 5 },
        { name: '商业化落地（25%）', max: 5 },
        { name: '团队与治理（15%）', max: 5 },
        { name: '资本与股东（15%）', max: 5 },
        { name: '风险可控（10%）', max: 5 },
        { name: '成长空间（15%）', max: 5 }
      ],
      radius: '62%',
      axisName: { color: ink, fontSize: 12 },
      splitLine: { lineStyle: { color: rule } },
      splitArea: { areaStyle: { color: ['transparent', bg2] } },
      axisLine: { lineStyle: { color: rule } }
    },
    series: [{
      type: 'radar',
      data: [
        { name: '智谱 4.13', value: [4.5, 4.0, 4.0, 4.5, 3.5, 4.0], itemStyle: { color: accent }, lineStyle: { color: accent, width: 2.5 }, areaStyle: { color: accent + '22' }, symbolSize: 5 },
        { name: 'MiniMax 3.33', value: [3.5, 3.0, 3.5, 3.5, 3.0, 3.5], itemStyle: { color: accent2 }, lineStyle: { color: accent2, width: 2.5 }, areaStyle: { color: accent2 + '22' }, symbolSize: 5 }
      ]
    }]
  });
  window.addEventListener('resize', function () { chartRadar.resize(); });
})();
