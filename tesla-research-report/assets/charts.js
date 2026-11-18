/* tesla-research-report charts (ECharts) */
(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();
  var palette = [accent, accent2, '#a06a2c', '#6d7a85', accent + '99', accent2 + '99'];

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

  // --- 图1：年度营收与净利 ---
  var c1 = init('chart-rev');
  if (c1) {
    c1.setOption({
      animation: false,
      color: palette,
      legend: { top: 0, textStyle: { color: muted, fontSize: 12 } },
      tooltip: tooltip({ valueFormatter: function (v) { return v + ' 十亿美元'; } }),
      grid: { left: 56, right: 56, top: 40, bottom: 30 },
      xAxis: Object.assign(baseAxis(), { type: 'category', data: ['2021', '2022', '2023', '2024', '2025'], axisLabel: { color: ink, fontSize: 12 } }),
      yAxis: [
        Object.assign(baseAxis(), { type: 'value', name: '营收(十亿美元)', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
        Object.assign(baseAxis(), { type: 'value', name: '净利(十亿美元)', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: false } })
      ],
      series: [
        { name: '总营收', type: 'bar', barMaxWidth: 40, data: [53.8, 81.5, 96.8, 97.7, 94.8], itemStyle: { color: accent, borderRadius: [3, 3, 0, 0] }, label: { show: true, position: 'top', color: ink, fontSize: 11 } },
        { name: 'GAAP净利润', type: 'line', yAxisIndex: 1, data: [5.5, 12.6, 15.0, 7.1, 3.8], symbol: 'circle', symbolSize: 8, lineStyle: { width: 2.5, color: accent2 }, itemStyle: { color: accent2 }, label: { show: true, position: 'top', color: accent2, fontSize: 11 } }
      ]
    });
    window.addEventListener('resize', function () { c1.resize(); });
  }

  // --- 图2：收入结构 ---
  var c2 = init('chart-mix');
  if (c2) {
    c2.setOption({
      animation: false,
      color: palette,
      legend: { top: 0, textStyle: { color: muted, fontSize: 12 } },
      tooltip: tooltip({ valueFormatter: function (v) { return v + ' 十亿美元'; } }),
      grid: { left: 56, right: 40, top: 40, bottom: 30 },
      xAxis: Object.assign(baseAxis(), { type: 'category', data: ['2021', '2022', '2023', '2024', '2025', '9M2026'], axisLabel: { color: ink, fontSize: 12 } }),
      yAxis: Object.assign(baseAxis(), { type: 'value', name: '十亿美元', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
      series: [
        { name: '汽车', type: 'bar', stack: 'all', barMaxWidth: 40, data: [47.2, 71.5, 82.4, 77.1, 69.5, 57.3], itemStyle: { color: accent }, label: { show: true, position: 'inside', color: '#fff', fontSize: 10 } },
        { name: '能源', type: 'bar', stack: 'all', data: [2.8, 3.9, 6.0, 10.1, 12.8, 8.4], itemStyle: { color: accent2 } },
        { name: '服务及其他', type: 'bar', stack: 'all', data: [3.8, 6.1, 8.3, 10.5, 12.5, 12.9], itemStyle: { color: '#a06a2c', borderRadius: [3, 3, 0, 0] }, label: { show: true, position: 'inside', color: '#fff', fontSize: 10 } }
      ]
    });
    window.addEventListener('resize', function () { c2.resize(); });
  }

  // --- 图3：季度交付 ---
  var c3 = init('chart-delivery');
  if (c3) {
    var q = ['2025Q1', '2025Q2', '2025Q3', '2025Q4', '2026Q1', '2026Q2', '2026Q3'];
    c3.setOption({
      animation: false,
      color: palette,
      legend: { top: 0, textStyle: { color: muted, fontSize: 12 } },
      tooltip: tooltip({ valueFormatter: function (v) { return v == null ? '-' : v.toLocaleString() + ' 辆'; } }),
      grid: { left: 64, right: 58, top: 40, bottom: 30 },
      xAxis: Object.assign(baseAxis(), { type: 'category', data: q, axisLabel: { color: ink, fontSize: 11 } }),
      yAxis: [
        Object.assign(baseAxis(), { type: 'value', name: '交付(辆)', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
        Object.assign(baseAxis(), { type: 'value', name: '同比%', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: false } })
      ],
      series: [
        { name: 'Model 3/Y', type: 'bar', stack: 'd', barMaxWidth: 42, data: [323800, 373728, 481166, 406585, 341893, 467762, 478237], itemStyle: { color: accent } },
        { name: '其他车型', type: 'bar', stack: 'd', data: [12881, 10394, 15933, 11642, 16130, 12364, 8295], itemStyle: { color: '#a06a2c', borderRadius: [3, 3, 0, 0] } },
        { name: '交付同比', type: 'line', yAxisIndex: 1, data: [null, null, null, null, 6.3, 25.0, -2.1], symbol: 'circle', symbolSize: 7, lineStyle: { width: 2.5, color: accent2 }, itemStyle: { color: accent2 }, label: { show: true, position: 'top', color: accent2, fontSize: 10, formatter: '{c}%' } }
      ]
    });
    window.addEventListener('resize', function () { c3.resize(); });
  }

  // --- 图4：年度利润率 ---
  var c4 = init('chart-margin');
  if (c4) {
    c4.setOption({
      animation: false,
      color: palette,
      legend: { top: 0, textStyle: { color: muted, fontSize: 12 } },
      tooltip: tooltip({ valueFormatter: function (v) { return v + '%'; } }),
      grid: { left: 48, right: 40, top: 40, bottom: 30 },
      xAxis: Object.assign(baseAxis(), { type: 'category', data: ['2021', '2022', '2023', '2024', '2025'], axisLabel: { color: ink, fontSize: 12 } }),
      yAxis: Object.assign(baseAxis(), { type: 'value', name: '%', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
      series: [
        { name: '综合毛利率', type: 'bar', barMaxWidth: 36, data: [25.3, 25.6, 18.2, 17.9, 18.0], itemStyle: { color: accent, borderRadius: [3, 3, 0, 0] }, label: { show: true, position: 'top', color: ink, fontSize: 11, formatter: '{c}%' } },
        { name: '营业利润率', type: 'line', data: [12.1, 16.8, 9.2, 7.2, 4.6], symbol: 'circle', symbolSize: 8, lineStyle: { width: 2.5, color: accent2 }, itemStyle: { color: accent2 }, label: { show: true, position: 'bottom', color: accent2, fontSize: 11, formatter: '{c}%' } }
      ]
    });
    window.addEventListener('resize', function () { c4.resize(); });
  }

  // --- 图5：2026年9月全球EV份额 ---
  var c5 = init('chart-share');
  if (c5) {
    c5.setOption({
      animation: false,
      color: palette,
      tooltip: tooltip({ trigger: 'item', formatter: '{b}: {c}% ({d}%)' }),
      legend: { bottom: 0, textStyle: { color: muted, fontSize: 12 } },
      series: [{
        type: 'pie',
        radius: ['42%', '68%'],
        center: ['50%', '44%'],
        label: { color: ink, fontSize: 12, formatter: '{b}\n{c}%' },
        labelLine: { lineStyle: { color: rule } },
        data: [
          { name: '比亚迪', value: 15.8 },
          { name: '特斯拉', value: 12.2 },
          { name: '吉利', value: 8.8 },
          { name: '其他品牌合计', value: 63.2 }
        ]
      }]
    });
    window.addEventListener('resize', function () { c5.resize(); });
  }

  // --- 图6：2025年收入地区结构 ---
  var c6 = init('chart-region');
  if (c6) {
    c6.setOption({
      animation: false,
      color: palette,
      tooltip: tooltip({ trigger: 'item', formatter: '{b}: {c} 十亿美元 ({d}%)' }),
      legend: { bottom: 0, textStyle: { color: muted, fontSize: 12 } },
      series: [{
        type: 'pie',
        radius: ['40%', '66%'],
        center: ['50%', '43%'],
        label: { color: ink, fontSize: 12, formatter: '{b}\n{c}' },
        data: [
          { name: '美国', value: 47.6 },
          { name: '中国', value: 21.0 },
          { name: '其他市场', value: 26.2 }
        ]
      }]
    });
    window.addEventListener('resize', function () { c6.resize(); });
  }

  // --- 图7：情景估值区间 ---
  var c7 = init('chart-scenario');
  if (c7) {
    c7.setOption({
      animation: false,
      color: palette,
      legend: { top: 0, textStyle: { color: muted, fontSize: 12 } },
      tooltip: tooltip({
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: function (ps) {
          var ranges = { '悲观': '0.25–0.35 万亿美元', '中性': '0.70–0.90 万亿美元', '乐观': '1.80–2.50 万亿美元' };
          return ps[0].name + '<br/>隐含股权价值：' + ranges[ps[0].name];
        }
      }),
      grid: { left: 70, right: 50, top: 40, bottom: 30 },
      xAxis: Object.assign(baseAxis(), { type: 'value', name: '万亿美元', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
      yAxis: Object.assign(baseAxis(), { type: 'category', data: ['乐观', '中性', '悲观'], axisLabel: { color: ink, fontSize: 12 } }),
      series: [
        { name: '区间下限', type: 'bar', stack: 's', silent: true, data: [1800, 700, 250], itemStyle: { color: 'transparent' } },
        { name: '情景区间', type: 'bar', stack: 's', barMaxWidth: 26, data: [700, 200, 100], itemStyle: { color: accent, borderRadius: [0, 3, 3, 0] }, label: { show: true, position: 'right', color: ink, fontSize: 11, formatter: function (p) { return ['1.80–2.50', '0.70–0.90', '0.25–0.35'][2 - p.dataIndex] + ' 万亿'; } }, markLine: { symbol: 'none', data: [{ xAxis: 1501, label: { formatter: '当前市值 1.50 万亿', color: accent2, fontSize: 11, position: 'insideEndTop' }, lineStyle: { color: accent2, type: 'dashed', width: 2 } }] } }
      ]
    });
    window.addEventListener('resize', function () { c7.resize(); });
  }
})();
