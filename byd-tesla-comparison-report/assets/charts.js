/* byd-tesla-comparison charts (ECharts) */
(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();   /* BYD green */
  var accent2 = style.getPropertyValue('--accent2').trim(); /* Tesla red */
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

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
  function init(id) {
    var el = document.getElementById(id);
    if (!el || !window.echarts) return null;
    return echarts.init(el, null, { renderer: 'svg' });
  }

  // --- Chart 1: 2025全球BESS集成商出货 ---
  var c1 = init('chart-storage');
  if (c1) {
    c1.setOption({
      animation: false,
      color: palette(accent, accent2, muted),
      legend: { top: 0, textStyle: { color: muted, fontSize: 12 } },
      tooltip: tooltip({}),
      grid: { left: 60, right: 60, top: 40, bottom: 30 },
      xAxis: Object.assign(baseAxis(), { type: 'category', data: ['2023', '2024', '2025'], axisLabel: { color: ink, fontSize: 12 } }),
      yAxis: [
        Object.assign(baseAxis(), { type: 'value', name: 'GWh', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
        Object.assign(baseAxis(), { type: 'value', name: '全球份额%', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: false } })
      ],
      series: [
        { name: '比亚迪出货(GWh)', type: 'bar', barMaxWidth: 40, data: [null, null, 60], itemStyle: { color: accent, borderRadius: [3, 3, 0, 0] } },
        { name: '特斯拉出货(GWh)', type: 'bar', barMaxWidth: 40, data: [14.7, 31.4, 46.7], itemStyle: { color: accent2, borderRadius: [3, 3, 0, 0] } },
        { name: '比亚迪份额%', type: 'line', yAxisIndex: 1, data: [null, null, 13.0], symbol: 'circle', symbolSize: 7, lineStyle: { width: 2.5, color: accent }, itemStyle: { color: accent } },
        { name: '特斯拉份额%', type: 'line', yAxisIndex: 1, data: [null, null, 10.0], symbol: 'circle', symbolSize: 7, lineStyle: { width: 2.5, color: accent2 }, itemStyle: { color: accent2 } }
      ]
    });
    window.addEventListener('resize', function () { c1.resize(); });
  }

  // --- Chart 2: BYD智驾方案单芯片/整包算力 ---
  var c2 = init('chart-chip');
  if (c2) {
    c2.setOption({
      animation: false,
      tooltip: tooltip({ trigger: 'item', formatter: '{b}: {c} TOPS' }),
      grid: { left: 130, right: 70, top: 20, bottom: 30 },
      xAxis: Object.assign(baseAxis(), { type: 'value', name: 'TOPS', splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
      yAxis: Object.assign(baseAxis(), {
        type: 'category',
        data: ['天神之眼C·征程6M', '天神之眼C·Orin-N', '天神之眼B·Orin-X', '璇玑A3（单颗）', '璇玑A3（三颗整包）'],
        axisLabel: { color: ink, fontSize: 11 }
      }),
      series: [{
        type: 'bar',
        barMaxWidth: 22,
        label: { show: true, position: 'right', color: ink, fontSize: 11 },
        data: [
          { value: 128, itemStyle: { color: muted } },
          { value: 84, itemStyle: { color: muted } },
          { value: 254, itemStyle: { color: accent } },
          { value: 700, itemStyle: { color: accent } },
          { value: 2100, itemStyle: { color: accent } }
        ]
      }]
    });
    window.addEventListener('resize', function () { c2.resize(); });
  }

  // --- Chart 3: 2026H1全球人形机器人出货 ---
  var c3 = init('chart-robot');
  if (c3) {
    c3.setOption({
      animation: false,
      tooltip: tooltip({ trigger: 'item', formatter: '{b}: {c}台（{d}%）' }),
      legend: { bottom: 0, textStyle: { color: muted, fontSize: 12 } },
      series: [{
        type: 'pie',
        radius: ['40%', '66%'],
        center: ['50%', '44%'],
        label: { color: ink, fontSize: 12, formatter: '{b}\n{c}台' },
        labelLine: { lineStyle: { color: rule } },
        data: [
          { name: '智元机器人', value: 8400, itemStyle: { color: accent } },
          { name: '宇树科技', value: 5900, itemStyle: { color: '#3f7d5c' } },
          { name: '其他中国厂商', value: 4150, itemStyle: { color: '#a06a2c' } },
          { name: '海外厂商（特斯拉/Figure等）', value: 550, itemStyle: { color: accent2 } }
        ]
      }]
    });
    window.addEventListener('resize', function () { c3.resize(); });
  }

  // --- Chart 4: 2025年全球新增储能地区分布（新增，3.1节） ---
  var d1 = init('chart-es-region');
  if (d1) {
    d1.setOption({
      animation: false,
      tooltip: tooltip({ trigger: 'item', formatter: '{b}: {c}%（MW口径占比）' }),
      legend: { bottom: 0, textStyle: { color: muted, fontSize: 12 } },
      series: [{
        type: 'pie',
        radius: ['38%', '64%'],
        center: ['50%', '42%'],
        label: { color: ink, fontSize: 12, formatter: '{b}\n{c}%' },
        labelLine: { lineStyle: { color: rule } },
        data: [
          { name: '中国', value: 58.6, itemStyle: { color: accent } },
          { name: '美国', value: 16.2, itemStyle: { color: '#3f7d5c' } },
          { name: '欧洲', value: 13.6, itemStyle: { color: '#a06a2c' } },
          { name: '澳大利亚', value: 4.4, itemStyle: { color: '#4a7ba6' } },
          { name: '其他', value: 7.2, itemStyle: { color: muted } }
        ]
      }]
    });
    window.addEventListener('resize', function () { d1.resize(); });
  }

  // --- Chart 5: 2021-2025全球新型储能年度新增（GW，新增，3.1节） ---
  var d2 = init('chart-es-history');
  if (d2) {
    d2.setOption({
      animation: false,
      tooltip: tooltip({}),
      grid: { left: 55, right: 30, top: 40, bottom: 30 },
      xAxis: Object.assign(baseAxis(), { type: 'category', data: ['2021', '2022', '2023', '2024', '2025'], axisLabel: { color: ink, fontSize: 12 } }),
      yAxis: Object.assign(baseAxis(), { type: 'value', name: 'GW', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
      series: [{
        name: '全球新型储能年度新增（GW）',
        type: 'bar',
        barMaxWidth: 40,
        data: [10.2, 20.4, 45.6, 74.1, 113.3],
        label: { show: true, position: 'top', color: ink, fontSize: 11 },
        itemStyle: { color: accent, borderRadius: [3, 3, 0, 0] }
      }]
    });
    window.addEventListener('resize', function () { d2.resize(); });
  }

  // --- Chart 6: 2030年三情景年度新增（GWh，新增，3.1节） ---
  var d3 = init('chart-es-scenario');
  if (d3) {
    d3.setOption({
      animation: false,
      tooltip: tooltip({}),
      grid: { left: 60, right: 40, top: 60, bottom: 30 },
      xAxis: Object.assign(baseAxis(), { type: 'category', data: ['悲观情景', '中性情景', '乐观情景'], axisLabel: { color: ink, fontSize: 12 } }),
      yAxis: Object.assign(baseAxis(), { type: 'value', name: 'GWh/年', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
      series: [{
        name: '2030年全球年度新增（GWh）',
        type: 'bar',
        barMaxWidth: 56,
        data: [
          { value: 550, itemStyle: { color: accent2, borderRadius: [3, 3, 0, 0] } },
          { value: 950, itemStyle: { color: accent, borderRadius: [3, 3, 0, 0] } },
          { value: 1300, itemStyle: { color: '#4a7ba6', borderRadius: [3, 3, 0, 0] } }
        ],
        label: { show: true, position: 'top', color: ink, fontSize: 12, fontWeight: 700 },
        markLine: {
          symbol: 'none',
          silent: true,
          data: [{ yAxis: 306, label: { formatter: '2025年实际 ≈306 GWh', color: ink, fontSize: 11 }, lineStyle: { color: muted, type: 'dashed' } }]
        }
      }]
    });
    window.addEventListener('resize', function () { d3.resize(); });
  }

  function palette(a, b, m) { return [a, b, m, a + '99', b + '99', '#a06a2c', '#3f7d5c']; }
})();
