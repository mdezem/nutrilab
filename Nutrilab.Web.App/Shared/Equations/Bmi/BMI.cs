using Nutrilab.Web.App.Shared.Equations;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Nutrilab.Web.App.Shared.Services.Nutrition
{
  public class BMI : PatientEquation
  {
    public static List<BmiClassification> BmiClassifications = new()
    {
      new(16, "Underweight: Severe Thinness"),
      new(17, "Underweight: Moderate Thinness"),
      new(18.5, "Underweight: Mild Thinness"),
      new(25, "Normal"),
      new(27.5, "Overweight"),
      new(30, "Pre-Obese"),
      new(35, "Obese class I"),
      new(40, "Obese class II"),
      new(100, "Obese class III")
    };

    public BMI(PatientInfo patientInfo): base("BMI", patientInfo, "BMI")
    {
    }

    static BMI()
    {
      for (var i = 0; i < BmiClassifications.Count; i++)
      {
        var current = BmiClassifications[i];

        // min range
        if (i == 0)
        {
          current.MinRange = 0;
        }
        else
        {
          current.MinRange = BmiClassifications[i + 1].MaxRange + 0.1d;
        }

        if (i < BmiClassifications.Count - 1)
        {
          current.MaxRange = Math.Round(
            current.StrictValue + (BmiClassifications[i + 1].StrictValue - current.StrictValue) / 2d, 1);
        }
        else
        {
          current.MaxRange = Double.MaxValue;
        }
      }
    }

    protected override double ComputeValue()
    {
      var bmi = Math.Round((WeightKg * 10) / (HeightCm / 100d * (HeightCm / 100d)), 1);

      Classification = bmi > 1
        ? BmiClassifications.FirstOrDefault(c => c.MinRange <= bmi && bmi <= c.MaxRange)
        : null;

      if (Classification == null)
      {
        AddError("Invalid BMI Value");
        return 0;
      }

      return bmi;
    }

    public BmiClassification Classification { get; private set; }

    public double HeightCm { get => PatientInfo.HeightCm; }
    public double WeightKg { get => PatientInfo.WeightKg; }

  }
}

