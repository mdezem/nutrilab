# Enteral and Parenteral Nutrition Summary
Analyses the nutritional components of enteral and parenteral nutrition

## Parameters

### Patient

- Gender (M/F)
- Height (cm)
- Weight (kg)
- Propofol (mcg/kg/min)

### Enteral Nutrition

- Formula 
  - Kcal (kcal/ml)
  - Carbs (%),
  - Protein (%),
  - Lipids (%),
  - Free Water (%)
- Rate (ml/hr)
- Duration (hrs - 8, 12, 16, 18, 20, 22, 24)
- Free water flush (ml/hr or  2hr, 3, 4, 5, 6, 8, 12, 18, 24hr);
- Protein supplement (g/day)

### Parenteral Nutritional

- Total Volume (ml)
- Rate (ml/hr)
- Duration (24, 18, 12, 8hrs)
- Dextrose (%)
- Protein (%)
- Lipids (ml/day)

# Results

## Nutritional Components

Table showing quantities and calories of each macro component, sliced wy the route of feeding (Enteral/Parenteral/Propofol).

### Fields

#### Formula
(enteral and parenteral)

- Total Feed = [Rate] * [Duration]
- Carbs = [Formula.Carbs] * {Total Feed}
- Protein = [Formula.Protein] * {Total Feed}
- Lipids = [Formula.Lipids] * {Total Feed}
- Free Water = [Formula.Water] * {Total Feed}
- Calories = [Formula.KCal] * {Total Feed};

#### Enteral

- Flush Water 
    - if unit is "ml/hr": [Duration] * [Free Water]
    - otherwise = Ceil([Duration] / [Flush Interval]) * [Free Water]

- Protein = [Formula.Protein] * {Total Feed} + [Protein Supplement]
- Fluid = [Formula.FreeWater] + [Flush Water];
- Calories = [Formula.Kcal] * {Total Feed}

#### Propofol
- Lipids (g) = [Propofol] * [Weight] * [Duration] * Math.Pow(10, -6) * 60;

