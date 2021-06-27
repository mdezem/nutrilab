using System;
using System.Text;
using System.Threading.Tasks;

namespace Nutrilab.Web.App.Shared.Services.Nutrition
{

  public static class WeightUtils
  {
    private const double BASE_HEIGHT = 152.4; // (60in)
    private const double MEN_BASE_WEIGHT = 48.0808; // (106lb)
    private const double MEN_HEIGHT_FACTOR = 2.72155; // (6lb)
    private const double WOMEN_BASE_WEIGHT = 45.3292; // (100lb)
    private const double WOMEN_HEIGHT_FACTOR = 2.26792; // (5lb)
    private const double ONE_INCH = 2.54;

    public static double IdealBodyWeightKg(Gender gender, double heightCm)
    {

      var base_weight = 0d;
      var height_factor = 0d;

      if (gender == Gender.Male)
      {
        base_weight = MEN_BASE_WEIGHT;
        height_factor = MEN_HEIGHT_FACTOR;
      }
      else
      {
        base_weight = WOMEN_BASE_WEIGHT;
        height_factor = WOMEN_HEIGHT_FACTOR;
      }

      var result = base_weight + ((heightCm / ONE_INCH) - BASE_HEIGHT) / ONE_INCH * height_factor;

      return Math.Round(result, 1);
    }

    public static double NutritionalBodyWeightKg(Gender gender, BMI bmi)
    {
      var ideal = IdealBodyWeightKg(gender, bmi.HeightCm);

      // for obese patients
      if (bmi.Result >= 30)
      {
        return ideal + 0.25 * (bmi.WeightKg - ideal);
      }
      return ideal;
    }
  }
}

