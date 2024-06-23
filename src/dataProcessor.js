// src/dataProcessor.js

export function processData(data) {
    const yearData = {};
    const cropData = {};
  
    data.forEach(row => {
      const year = row.Year;
      const crop = row.Crop;
      const production = parseFloat(row.Production) || 0;
      const yieldValue = parseFloat(row.Yield) || 0;
      const area = parseFloat(row.Area) || 0;
  
      if (!yearData[year]) {
        yearData[year] = {};
      }
      if (!cropData[crop]) {
        cropData[crop] = { totalYield: 0, totalArea: 0, count: 0 };
      }
  
      yearData[year][crop] = production;
      cropData[crop].totalYield += yieldValue;
      cropData[crop].totalArea += area;
      cropData[crop].count += 1;
    });
  
    const yearTable = Object.keys(yearData).map(year => {
      const crops = yearData[year];
      const maxCrop = Object.keys(crops).reduce((a, b) => (crops[a] > crops[b] ? a : b));
      const minCrop = Object.keys(crops).reduce((a, b) => (crops[a] < crops[b] ? a : b));
      return { year, maxCrop, minCrop };
    });
  
    const cropTable = Object.keys(cropData).map(crop => {
      const data = cropData[crop];
      return {
        crop,
        averageYield: (data.totalYield / data.count).toFixed(3),
        averageArea: (data.totalArea / data.count).toFixed(3),
      };
    });
  
    return { yearTable, cropTable };
  }
  