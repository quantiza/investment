/* byd-investment-report charts (ECharts) + mermaid init */
(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();
  var palette = [accent, accent2, muted, accent + '99', accent2 + '99', '#a06a2c', '#3f7d5c'];

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
    if (!el) return null;
    return echarts.init(el, null, { renderer: 'svg' });
  }

  // --- Chart 1: 2025全球动力电池份额 ---
  var c1 = init('chart-battery');
  if (c1) {
    c1.setOption({
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
          { name: '宁德时代', value: 39.1 },
          { name: '比亚迪（弗迪）', value: 16.4 },
          { name: '韩系三强（LG/SK/松下）', value: 15.3 },
          { name: '其他中企四家', value: 14.9 },
          { name: '其他', value: 14.3 }
        ]
      }]
    });
    window.addEventListener('resize', function () { c1.resize(); });
  }

  // --- Chart 2: 年度销量+海外 ---
  var c2 = init('chart-sales');
  if (c2) {
    var sYears = ['2020', '2021', '2022', '2023', '2024', '2025', '2026E'];
    c2.setOption({
      animation: false,
      color: palette,
      legend: { top: 0, textStyle: { color: muted, fontSize: 12 } },
      tooltip: tooltip({}),
      grid: { left: 56, right: 56, top: 40, bottom: 30 },
      xAxis: Object.assign(baseAxis(), { type: 'category', data: sYears, axisLabel: { color: ink, fontSize: 12 } }),
      yAxis: [
        Object.assign(baseAxis(), { type: 'value', name: '万辆', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
        Object.assign(baseAxis(), { type: 'value', name: '海外万辆', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: false } })
      ],
      series: [
        { name: '总销量', type: 'bar', barMaxWidth: 36, data: [42.7, 73.0, 186.3, 302.4, 427.2, 460.2, 465], itemStyle: { color: accent, borderRadius: [3, 3, 0, 0] } },
        { name: '海外销量', type: 'line', yAxisIndex: 1, data: [null, null, 5.6, 24.3, 41.7, 105, 150], symbol: 'circle', symbolSize: 7, lineStyle: { width: 2.5, color: accent2 }, itemStyle: { color: accent2 } }
      ]
    });
    window.addEventListener('resize', function () { c2.resize(); });
  }

  // --- Chart 3: 营收/净利 2020-2026E ---
  var c3 = init('chart-fin');
  if (c3) {
    var fYears = ['2020', '2021', '2022', '2023', '2024', '2025', '2026E'];
    var fRev = [1566, 2161, 4241, 6023, 7771, 8040, 8775];
    var fProfit = [42.3, 30.5, 166.2, 300.4, 402.5, 326.2, 372.1];
    var fGrowth = [38, 38, 96, 42, 29, 3.5, 9];
    c3.setOption({
      animation: false,
      color: palette,
      legend: { top: 0, textStyle: { color: muted, fontSize: 12 } },
      tooltip: tooltip({}),
      grid: { left: 60, right: 56, top: 40, bottom: 30 },
      xAxis: Object.assign(baseAxis(), { type: 'category', data: fYears, axisLabel: { color: ink, fontSize: 12 } }),
      yAxis: [
        Object.assign(baseAxis(), { type: 'value', name: '亿元', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
        Object.assign(baseAxis(), { type: 'value', name: '营收同比%', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: false } })
      ],
      series: [
        { name: '营业收入', type: 'bar', barMaxWidth: 34, data: fRev, itemStyle: { color: accent, borderRadius: [3, 3, 0, 0] } },
        { name: '归母净利润', type: 'bar', barMaxWidth: 22, data: fProfit, itemStyle: { color: accent2, borderRadius: [3, 3, 0, 0] } },
        { name: '营收同比', type: 'line', yAxisIndex: 1, data: fGrowth, symbol: 'circle', symbolSize: 7, lineStyle: { width: 2.5, color: muted }, itemStyle: { color: muted } }
      ]
    });
    window.addEventListener('resize', function () { c3.resize(); });
  }

  // --- Chart 4: 2026分季度修复 ---
  var c4 = init('chart-quarter');
  if (c4) {
    c4.setOption({
      animation: false,
      color: palette,
      legend: { top: 0, textStyle: { color: muted, fontSize: 12 } },
      tooltip: tooltip({}),
      grid: { left: 60, right: 60, top: 40, bottom: 30 },
      xAxis: Object.assign(baseAxis(), { type: 'category', data: ['2026Q1', '2026Q2', '2026Q3'], axisLabel: { color: ink, fontSize: 12 } }),
      yAxis: [
        Object.assign(baseAxis(), { type: 'value', name: '营收(亿元)', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
        Object.assign(baseAxis(), { type: 'value', name: '净利(亿元)', nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: false } })
      ],
      series: [
        { name: '单季营收', type: 'bar', barMaxWidth: 44, data: [1502, 1946, 2215], itemStyle: { color: accent, borderRadius: [3, 3, 0, 0] }, label: { show: true, position: 'top', color: ink, fontSize: 11 } },
        { name: '单季归母净利', type: 'line', yAxisIndex: 1, data: [40.85, 82.4, 100.2], symbol: 'circle', symbolSize: 8, lineStyle: { width: 2.5, color: accent2 }, itemStyle: { color: accent2 }, label: { show: true, position: 'top', color: accent2, fontSize: 11 } }
      ]
    });
    window.addEventListener('resize', function () { c4.resize(); });
  }

  // --- Chart 5: 毛利率+单车利润 ---
  var c5 = init('chart-margin');
  if (c5) {
    c5.setOption({
      animation: false,
      color: palette,
      legend: { top: 0, textStyle: { color: muted, fontSize: 12 } },
      tooltip: tooltip({}),
      grid: { left: 52, right: 56, top: 40, bottom: 30 },
      xAxis: Object.assign(baseAxis(), { type: 'category', data: ['2022', '2023', '2024', '2025', '2026Q3'], axisLabel: { color: ink, fontSize: 12 } }),
      yAxis: [
        Object.assign(baseAxis(), { type: 'value', name: '毛利率%', min: 10, max: 25, nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
        Object.assign(baseAxis(), { type: 'value', name: '单车利润(万元)', min: 0, max: 1.0, nameTextStyle: { color: muted, fontSize: 11 }, splitLine: { show: false } })
      ],
      series: [
        { name: '毛利率', type: 'bar', barMaxWidth: 40, data: [17.0, 20.2, 19.3, 17.4, 18.0], itemStyle: { color: accent, borderRadius: [3, 3, 0, 0] } },
        { name: '单车利润(估算)', type: 'line', yAxisIndex: 1, data: [null, null, 0.85, 0.62, 0.73], symbol: 'circle', symbolSize: 8, lineStyle: { width: 2.5, color: accent2 }, itemStyle: { color: accent2 } }
      ]
    });
    window.addEventListener('resize', function () { c5.resize(); });
  }

  // --- Chart 6: 可比PE ---
  var c6 = init('chart-peers');
  if (c6) {
    c6.setOption({
      animation: false,
      tooltip: tooltip({ trigger: 'item' }),
      grid: { left: 90, right: 60, top: 20, bottom: 30 },
      xAxis: Object.assign(baseAxis(), { type: 'value', name: 'PE(TTM)', splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
      yAxis: Object.assign(baseAxis(), {
        type: 'category',
        data: ['吉利汽车', '宁德时代', '比亚迪H(测)', '小米集团', '长城汽车A', '比亚迪A'],
        axisLabel: { color: ink, fontSize: 12 }
      }),
      series: [{
        type: 'bar',
        data: [
          { value: 8.6, itemStyle: { color: muted } },
          { value: 14.7, itemStyle: { color: muted } },
          { value: 15.9, itemStyle: { color: accent2 } },
          { value: 19.9, itemStyle: { color: muted } },
          { value: 21.8, itemStyle: { color: muted } },
          { value: 23.1, itemStyle: { color: accent } }
        ],
        barMaxWidth: 22,
        label: { show: true, position: 'right', color: ink, fontSize: 11 }
      }]
    });
    window.addEventListener('resize', function () { c6.resize(); });
  }

  // --- Chart 7: 风险散点矩阵 ---
  var c7 = init('chart-risk');
  if (c7) {
    var risks = [
      ['R1 国内价格战/份额下滑', 4.0, 4.0, 16.0],
      ['R2 政策退坡需求透支', 3.5, 3.5, 12.3],
      ['R3 海外地缘与关税反复', 3.0, 3.5, 10.5],
      ['R4 原材料价格反弹', 3.0, 2.5, 7.5],
      ['R5 智驾竞争落后', 3.0, 3.0, 9.0],
      ['R6 供应链账期/流动性', 2.0, 3.5, 7.0],
      ['R7 技术迭代颠覆', 2.5, 3.0, 7.5],
      ['R8 组织变革执行', 2.5, 2.5, 6.3],
      ['R9 高端化不及预期', 3.0, 2.0, 6.0],
      ['R10 海外产能爬坡', 2.5, 3.0, 7.5]
    ];
    c7.setOption({
      animation: false,
      tooltip: tooltip({
        trigger: 'item',
        formatter: function (p) { return p.data[3] + '<br/>概率 ' + p.data[0] + ' × 影响 ' + p.data[1] + ' → R=' + p.data[2]; }
      }),
      grid: { left: 56, right: 40, top: 30, bottom: 46 },
      xAxis: Object.assign(baseAxis(), { type: 'value', name: '发生概率 →', min: 0, max: 5, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } }, axisLabel: { color: muted, fontSize: 11 } }),
      yAxis: Object.assign(baseAxis(), { type: 'value', name: '影响程度 →', min: 0, max: 5, splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
      series: [{
        type: 'scatter',
        symbolSize: function (d) { return d[3] * 3.2; },
        data: risks.map(function (r) {
          return {
            name: r[0],
            value: [r[1], r[2], r[3], r[0]],
            itemStyle: { color: r[3] >= 10.5 ? accent2 : (r[3] >= 8 ? '#a06a2c' : accent), opacity: 0.85 }
          };
        }),
        label: { show: true, formatter: function (p) { return p.data.value[3].slice(0, 3); }, color: '#fff', fontSize: 11, fontWeight: 700 }
      }]
    });
    window.addEventListener('resize', function () { c7.resize(); });
  }

  // --- Chart 8: 估值区间汇总 ---
  var c8 = init('chart-val');
  if (c8) {
    c8.setOption({
      animation: false,
      color: palette,
      legend: { top: 0, textStyle: { color: muted, fontSize: 12 } },
      tooltip: tooltip({ trigger: 'axis', valueFormatter: function (v) { return v + ' 元'; } }),
      grid: { left: 80, right: 70, top: 40, bottom: 30 },
      xAxis: Object.assign(baseAxis(), { type: 'value', name: '每股价值(元)', splitLine: { show: true, lineStyle: { color: rule, type: 'dashed' } } }),
      yAxis: Object.assign(baseAxis(), { type: 'category', data: ['SOTP', 'DCF', 'PS法', 'PB法', 'PE法'], axisLabel: { color: ink, fontSize: 12 } }),
      series: [
        { name: '悲观', type: 'bar', data: [85, 55, 96, 76, 73], itemStyle: { color: accent2, borderRadius: [0, 2, 2, 0] }, label: { show: true, position: 'insideLeft', color: '#fff', fontSize: 10 } },
        { name: '中性', type: 'bar', data: [95, 104, 106, 91, 98], itemStyle: { color: accent, borderRadius: [0, 2, 2, 0] }, label: { show: true, position: 'insideLeft', color: '#fff', fontSize: 10 } },
        { name: '乐观', type: 'bar', data: [103, 146, 116, 106, 118], itemStyle: { color: muted, borderRadius: [0, 2, 2, 0] }, label: { show: true, position: 'right', color: ink, fontSize: 10 } },
        {
          name: 'A股现价', type: 'line', data: [[80, 0], [80, 4]], symbol: 'none', lineStyle: { width: 2, type: 'dashed', color: '#802f1d' }, itemStyle: { color: '#802f1d' },
          markPoint: { data: [{ coord: [80, 0], value: '现价80.0', itemStyle: { color: '#802f1d' }, label: { color: '#fff', fontSize: 10 } }] }
        }
      ]
    });
    window.addEventListener('resize', function () { c8.resize(); });
  }

  // --- mermaid ---
  if (window.mermaid) {
    mermaid.initialize({ startOnLoad: true, theme: 'neutral', securityLevel: 'loose' });
  }
})();
