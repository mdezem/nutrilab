using Nutrilab.Web.App.Shared.Equations.Bmi;
using System;
using System.Collections.Generic;

namespace Nutrilab.Web.App.Shared.Equations
{
  public abstract class PatientEquation<TOutput>
  {
    public string Name { get; set; }

    public string Group { get; set; }

    public PatientInfo PatientInfo { get; private set; }

    public BMI Bmi { get; private set; }

    protected PatientEquation(string name, PatientInfo patientInfo, string group)
    {
      Name = name;
      PatientInfo = patientInfo;
      Bmi = new BMI(patientInfo);
      Group = group;
    }


    public virtual bool Update()
    {
      Errors.Clear();
      if (!Bmi.Update())
      {
        // todo add errors
        return false;
      }
      Validate();
      if (Errors.Count > 0)
      {
        State = PatientEquationState.ValiationError;
        Result = default;
        return false;
      }

      if (!Accept())
      {
        State = PatientEquationState.NotApply;
        Result = default;
        return false;
      }

      TOutput output = Result;
      ComputeValue(ref output);
      Result = output;
      State = PatientEquationState.Ok;
      return true;
    }

    public List<EquationError> Errors { get; } = new();

    public void AddError(string errorMessage, string fieldName)
    {
      Errors.Add(new EquationError()
      {
        FieldName = fieldName,
        ErrorMessage = errorMessage
      });
    }

    public void AddError(string errorMessage)
    {
      Errors.Add(new EquationError()
      {
        FieldName = "*",
        ErrorMessage = errorMessage
      });
    }

    public TOutput Result { get; private set; }

    public PatientEquationState State { get; private set; }

    public bool HasErrors { get => State == PatientEquationState.ValiationError; }

    protected abstract void ComputeValue(ref TOutput output);

    public virtual bool Validate() => true;

    public virtual bool Accept() => true;

  }

  public abstract class PatientEquation<TInput, TOutput> : PatientEquation<TOutput>
    where TInput : PatientEquationInput
  {
    protected PatientEquation(string name, PatientInfo patientInfo, string group) : base(name, patientInfo, group)
    {
      Input = (TInput)Activator.CreateInstance(typeof(TInput), new[] { patientInfo });
    }

    public TInput Input { get; }
  }

  public class PatientEquationInput
  {
    public PatientEquationInput(PatientInfo patientInfo)
    {
      PatientInfo = patientInfo;
    }

    public PatientInfo PatientInfo { get; }

    public Gender Gender { get => PatientInfo.Gender; }

    public double WeightKg { get => PatientInfo.WeightKg; }

    public double HeightCm { get => PatientInfo.HeightCm; }

    public int AgeYr { get => PatientInfo.AgeYr; }
  }
}
