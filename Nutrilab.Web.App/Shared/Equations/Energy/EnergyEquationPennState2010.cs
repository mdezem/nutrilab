namespace Nutrilab.Web.App.Shared.Equations.Energy
{

  public class EnergyEquationPennState2010 : EnergyEquationVentilatedPatients
  {
    public EnergyEquationPennState2010(PatientInfo patientInfo) : base("Penn State 2010", patientInfo)
    {
      MifflinStJeor = new EnergyEquationMifflinStJeor(PatientInfo);
    }

    public EnergyEquationMifflinStJeor MifflinStJeor { get; }

    public override bool Accept()
    {
      return !(Bmi.Result.Value < 30 || Input.AgeYr < 60);
    }

    public override bool Validate()
    {
      return base.Validate() && MifflinStJeor.Validate();
    }

    protected override void ComputeValue(ref EnergyEquationOutput output)
    {
      output ??= new();

      if (MifflinStJeor.Update())
      {
        var msjResult = MifflinStJeor.Result.ResultKCalDay;

        output.ResultKCalDay =
          0.71 * msjResult
          + 85 * Input.TemperatureMaxC
          + 64 * Input.VentilationLMin
          - 3085;
      }
      // todo add errors
    }
  }
}

