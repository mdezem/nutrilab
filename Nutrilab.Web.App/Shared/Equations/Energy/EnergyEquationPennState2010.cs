namespace Nutrilab.Web.App.Shared.Services.Nutrition
{

  public class EnergyEquationPennState2010 : EnergyEquationVentilatedPatients
  {
    public EnergyEquationPennState2010( PatientInfo patientInfo) : base("Penn State 2010", patientInfo)
    {
      MifflinStJeor = new EnergyEquationMifflinStJeor(PatientInfo);
    }

    public EnergyEquationMifflinStJeor MifflinStJeor { get; }

    public override bool Accept()
    {
      return !(Bmi.Result < 30 || AgeYr < 60);
    }

    public override bool Validate()
    {
      return base.Validate() && MifflinStJeor.Validate();
    }

    protected override double ComputeValue()
    {
      if (MifflinStJeor.Update())
      {
        var msjResult = MifflinStJeor.Result;

        return 0.71 * msjResult + 85 * TemperatureMaxC + 64 * VentilationLMin - 3085;
      }
      // todo add errors
      return 0;
    }
  }
}

