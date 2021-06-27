namespace Nutrilab.Web.App.Shared.Services.Nutrition
{
  public class BmiClassification
  {
    public double StrictValue { get; set; }
    public string Label { get; set; }
    public double MinRange { get; set; }
    public double MaxRange { get; set; }

    public BmiClassification(double strictValue, string label)
    {
      StrictValue = strictValue;
      Label = label;
    }
  }
}

