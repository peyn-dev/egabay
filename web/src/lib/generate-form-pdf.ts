import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import type { StudentFormDetail } from '@/features/student/schemas/form-detail.schema'

function p(val: string): string {
  return val || ''
}

function checked(val: string): string {
  return val === '1' ? '&#10003;' : '&nbsp;'
}

function radioChecked(val: string, match: string): string {
  return (val || '').toLowerCase() === match.toLowerCase() ? '&#10003;' : '&nbsp;'
}

function livingChecked(val: string, type: string): string {
  return (val || '').toLowerCase() === type.toLowerCase() ? '&#10003;' : '&nbsp;'
}

function calcAge(birthday: string): string {
  if (!birthday) return ''
  const bd = new Date(birthday)
  const now = new Date()
  let age = now.getFullYear() - bd.getFullYear()
  const m = now.getMonth() - bd.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < bd.getDate())) age--
  return String(age)
}

function presentAddressFrom(p_: any): string {
  if (p_.address) return p_.address
  return ''
}

function buildFormHtml(form: StudentFormDetail): string {
  const p_ = form.profile
  const f = form.family
  const a = form.academic
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
  const age = calcAge(p_.date_of_birth)
  const fullName = (p_.last_name || p_.full_name || '').toUpperCase() + ', ' + p(p_.first_name) + ' ' + p(p_.middle_name)
  const presentAddr = presentAddressFrom(p_)
  const msuSeal = '/msu-seal.png'
  const dsaSeal = '/dsa-logo.png'

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @page { size: 8.5in 13in; margin: 0; }
  * { box-sizing: border-box; }
  body {
    font-family: "Times New Roman", Times, serif;
    color: #000; font-size: 11px; line-height: 1.35; margin: 0;
    background: #e9e9e9;
  }
  .page {
    background: #fff;
    width: 8.5in; min-height: 13in;
    margin: 20px auto;
    padding: 0.55in 0.65in;
    box-shadow: 0 0 8px rgba(0,0,0,0.25);
  }
  @media print {
    body { background: #fff; margin: 0; }
    .page {
      width: auto; margin: 0; padding: 0.55in 0.65in;
      box-shadow: none; page-break-after: always;
    }
  }
  .letterhead {
    border: 1px solid #000; display: flex; align-items: stretch; margin-bottom: 10px;
  }
  .letterhead-main {
    flex: 1; display: flex; align-items: center; justify-content: center;
    gap: 10px; padding: 8px 10px; border-right: 1px solid #000;
  }
  .letterhead-main img.seal-left { width: 60px; height: 60px; object-fit: contain; }
  .letterhead-main img.seal-right { width: 46px; height: 63px; object-fit: contain; }
  .letterhead-text { text-align: center; font-size: 11px; }
  .letterhead-text .uni { font-weight: bold; font-size: 12px; }
  .letterhead-text .division { font-weight: bold; margin-top: 2px; }
  .letterhead-text .formtitle { font-weight: bold; margin-top: 2px; }
  .letterhead-text .section { font-weight: bold; margin-top: 6px; font-family: "Century","Times New Roman",serif; }
  .letterhead-meta { width: 230px; font-size: 9px; }
  .letterhead-meta table { width: 100%; height: 100%; border-collapse: collapse; }
  .letterhead-meta td { border: 1px solid #000; padding: 2px 4px; vertical-align: middle; }
  .letterhead-meta td.label { width: 62px; }
  h1.title { text-align: center; font-size: 13px; font-weight: bold; letter-spacing: 0.5px; margin: 6px 0 10px; }
  .direction { margin-bottom: 8px; }
  .voluntary { margin-bottom: 10px; }
  .section-heading { font-weight: bold; margin: 12px 0 6px; font-size: 11.5px; }
  .field-line { display: flex; align-items: baseline; gap: 4px; margin: 5px 0; flex-wrap: wrap; }
  .field-label { white-space: nowrap; }
  .fill { border-bottom: 1px solid #000; flex: 1; min-width: 40px; height: 13px; }
  .fill.short { flex: 0 0 90px; }
  .fill.mid { flex: 0 0 156px; }
  .fill.med { flex: 0 0 160px; }
  .caption-row { display: flex; justify-content: space-around; font-size: 9px; font-style: italic; margin-top: -3px; margin-bottom: 6px; }
  .checkbox-row { margin: 6px 0; }
  .cb { display: inline-flex; align-items: center; gap: 4px; margin-right: 18px; }
  .cb .box { display: inline-block; width: 10px; height: 10px; border: 1px solid #000; }
  table.edu { width: 100%; border-collapse: collapse; margin: 6px 0 8px; font-size: 10px; }
  table.edu th, table.edu td { border: 1px solid #000; padding: 4px 5px; text-align: center; vertical-align: middle; }
  table.edu th { font-weight: bold; font-size: 9.5px; }
  table.edu td.level { text-align: left; font-weight: 500; }
  table.edu td.blank { height: 22px; }
  table.testrecord { width: 100%; border-collapse: collapse; margin: 6px 0 10px; font-size: 10px; }
  table.testrecord th, table.testrecord td { border: 1px solid #000; padding: 5px; text-align: center; }
  table.testrecord td { height: 20px; }
  .consent { display: flex; gap: 6px; align-items: flex-start; margin: 8px 0; font-style: italic; font-size: 10.5px; }
  .consent .box { flex: 0 0 11px; width: 11px; height: 11px; border: 1px solid #000; margin-top: 2px; }
  .disclaimer { margin: 10px 0; text-align: justify; font-size: 10.5px; }
  .sig-block { margin-top: 26px; }
  .sig-line { border-bottom: 1px solid #000; width: 100%; height: 30px; }
  .sig-cols { display: flex; gap: 20px; }
  .sig-cols > div { flex: 1; }
  .sig-caption { display: flex; justify-content: space-between; font-size: 9.5px; margin-top: 2px; }
  .footer { text-align: center; font-weight: bold; font-size: 10px; margin-top: 30px; }
  ol.qnum { margin: 4px 0 6px 18px; padding: 0; }
  ol.qnum li { margin-bottom: 6px; }
  .indent { margin-left: 18px; }
  .two-col-check { display: flex; flex-wrap: wrap; column-gap: 30px; row-gap: 4px; margin: 4px 0 8px; }
</style>
</head>
<body>

<div class="page">
  <div class="letterhead">
    <div class="letterhead-main">
      <img class="seal-left" src="${msuSeal}" alt="MSU Seal">
      <div class="letterhead-text">
        <div class="uni">MINDANAO STATE UNIVERSITY</div>
        <div>Marawi City</div>
        <div class="division">DIVISION OF STUDENT AFFAIRS</div>
        <div class="formtitle">STUDENT INDIVIDUAL INVENTORY</div>
        <div class="section">GUIDANCE AND COUNSELING SECTION</div>
      </div>
      <img class="seal-right" src="${dsaSeal}" alt="Office Seal">
    </div>
    <div class="letterhead-meta">
      <table>
        <tr><td class="label">Doc. Code:</td><td>MSU DSA Inventory Individual Form No. 3.1</td></tr>
        <tr><td class="label">Issue Date</td><td>04/04/2024</td></tr>
        <tr><td class="label">Revision No.</td><td>5</td></tr>
        <tr><td class="label">Page No.</td><td>Page 1 of 2</td></tr>
        <tr><td class="label">Date:</td><td>${p(today)}</td></tr>
        <tr><td class="label">Control No.</td><td>&nbsp;</td></tr>
      </table>
    </div>
  </div>

  <h1 class="title">STUDENT INDIVIDUAL INVENTORY RECORD FORM</h1>

  <p class="direction"><b>DIRECTION:</b> Please complete this inventory as accurately and honestly as you can. The purpose of collecting this information is to be of assistance to you in making choices and decisions. All information which you provide about yourself will be treated with utmost confidentiality.</p>

  <p class="voluntary"><b>Voluntary Participation:</b> <i>Submission of this form is entirely voluntary. You may refuse to answer any question without fear of academic or administrative penalty or discrimination.</i></p>

  <div class="section-heading">I. PERSONAL INFORMATION</div>

  <div class="field-line"><span class="field-label">I.D. Number:</span><span class="fill short" style="padding-left:20px;">${p(p_.student_id)}</span></div>

  <div class="field-line">
    <span class="field-label">Name:</span><span class="fill" style="flex:3; padding-left:30px;">
      ${p(p_.last_name ? p_.last_name.toUpperCase() : p_.full_name.toUpperCase())},&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      ${p(p_.first_name)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      ${p(p_.middle_name)}
    </span>
    <span class="field-label">Sex:</span><span class="fill short" style="padding-left:20px;">${p(p_.gender)}</span>
    <span class="field-label">Age:</span><span class="fill short" style="padding-left:30px;">${p(age)}</span>
  </div>
  <div class="caption-row" style="justify-content:flex-start; gap:80px; margin-left:75px;">
    <span>(Surname)</span><span>(First Name)</span><span>(Middle Name)</span>
  </div>

  <div class="checkbox-row">
    <span class="field-label" style="margin-right:10px;">Civil Status:</span>
    <span class="cb"><span class="box">${radioChecked(p_.civil_status, 'single')}</span> Single</span>
    <span class="cb"><span class="box">${radioChecked(p_.civil_status, 'married')}</span> Married</span>
    <span class="cb"><span class="box">${radioChecked(p_.civil_status, 'separated')}</span> Separated</span>
    <span class="cb"><span class="box">${radioChecked(p_.civil_status, 'widowed')}</span> Widow</span>
    <span class="cb"><span class="box">${radioChecked(p_.civil_status, 'solo parent')}</span> Solo Parent</span>
  </div>

  <div class="field-line">
    <span class="field-label">Course:</span><span class="fill med">${p(p_.program)}</span>
    <span class="field-label">Year Level:</span><span class="fill short" style="padding-left:25px;">${p(p_.year_level)}</span>
    <span class="field-label">A.Y.</span><span class="fill short"></span>
    <span class="field-label">Date of Birth:</span><span class="fill mid" style="padding-left:40px;">${p(p_.date_of_birth ? new Date(p_.date_of_birth).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '')}</span>
  </div>

  <div class="field-line">
    <span class="field-label">Height (m):</span><span class="fill short" style="padding-left:35px;">${p(p_.height)}</span>
    <span class="field-label">Weight:</span><span class="fill short" style="padding-left:35px;">${p(p_.weight)}</span>
    <span class="field-label">Place of Birth:</span><span class="fill" style="flex:2; padding-left:45px;">${p(p_.place_of_birth)}</span>
  </div>

  <div class="field-line">
    <span class="field-label">Present Address (Residential/Boarding House/Dormitory):</span><span class="fill" style="padding-left:50px;">${p(presentAddr)}</span>
  </div>

  <div class="field-line">
    <span class="field-label">Email Address:</span><span class="fill med">${p(p_.email)}</span>
    <span class="field-label">Hometown Address:</span><span class="fill" style="flex:2">${p(p_.home_town_address)}</span>
  </div>

  <div class="field-line">
    <span class="field-label">Mobile No.:</span><span class="fill med" style="padding-left:40px;">${p(p_.phone)}</span>
  </div>

  <div class="field-line">
    <span class="field-label">Grade Point Average:</span><span class="fill short">${p(p_.gpa)}</span>
    <span class="field-label">Religion:</span><span class="fill med" style="padding-left:40px;">${p(p_.religious_affiliation)}</span>
    <span class="field-label">Citizenship:</span><span class="fill short" style="padding-left:25px;">${p(p_.nationality)}</span>
    <span class="field-label">Tribe:</span><span class="fill short" style="padding-left:20px;">${p(p_.tribe || p_.other_tribe)}</span>
  </div>

  <div class="field-line">
    <span class="field-label">If working, please indicate the name and address of employer:</span><span class="fill" style="padding-left:40px;">${p((p_.is_currently_working === 'Yes' || p_.is_currently_working === '1' ? (a.employer_name + ' ' + a.employer_address) : ''))}</span>
  </div>

  <div class="field-line">
    <span class="field-label">Person to be contacted in case of emergency:</span><span class="fill" style="flex:2; padding-left:50px;">${p(f.emergency_contact_person)}</span>
    <span class="field-label">Contact No.</span><span class="fill med" style="padding-left:35px;">${p(f.emergency_contact_number)}</span>
  </div>

  <div class="field-line">
    <span class="field-label">Address:</span><span class="fill" style="flex:2; padding-left:50px;">${p(f.emergency_contact_person_address)}</span>
    <span class="field-label">Relationship:</span><span class="fill med" style="padding-left:40px;">${p(f.relationship)}</span>
  </div>

  <div class="section-heading">II. EDUCATIONAL BACKGROUND</div>

  <table class="edu">
    <thead>
      <tr>
        <th style="width:15%">LEVEL</th>
        <th style="width:20%">SCHOOL GRADUATED</th>
        <th style="width:25%">SCHOOL ADDRESS</th>
        <th style="width:10%">PUBLIC/ PRIVATE</th>
        <th style="width:12%">YEAR GRADUATED</th>
        <th style="width:18%">HONORS RECEIVED/ SPECIAL AWARDS</th>
      </tr>
    </thead>
    <tbody>
      <tr><td class="level">Elementary</td><td class="blank">${p(a.elementary_school_name)}</td><td class="blank">${p(a.elementary_address)}</td><td class="blank">${p(a.elementary_school_type)}</td><td class="blank">${p(a.elementary_year_graduated)}</td><td class="blank">${p(a.honors_received)}</td></tr>
      <tr><td class="level">Junior High School</td><td class="blank">${p(a.junior_high_school_name)}</td><td class="blank">${p(a.junior_high_address)}</td><td class="blank">${p(a.junior_high_school_type)}</td><td class="blank">${p(a.junior_year_graduated)}</td><td class="blank"></td></tr>
      <tr><td class="level">Vocational</td><td class="blank">${p(a.vocational_course_name)}</td><td class="blank">${p(a.vocational_address)}</td><td class="blank">${p(a.vocational_type)}</td><td class="blank">${p(a.vocational_year_graduated)}</td><td class="blank"></td></tr>
      <tr><td class="level">Senior High School</td><td class="blank">${p(a.senior_high_school_name)}</td><td class="blank">${p(a.senior_high_address)}</td><td class="blank">${p(a.senior_high_school_type)}</td><td class="blank">${p(a.senior_year_graduated)}</td><td class="blank"></td></tr>
      <tr><td class="level">College</td><td class="blank">${p(a.college_school_name)}</td><td class="blank">${p(a.college_address)}</td><td class="blank">${p(a.college_type)}</td><td class="blank">${p(a.college_year_graduated)}</td><td class="blank"></td></tr>
    </tbody>
  </table>

  <div class="checkbox-row">
    <span class="field-label" style="margin-right:10px;">Nature of Schooling:</span>
    <span class="cb"><span class="box">${radioChecked(a.nature_of_schooling, 'continuous')}</span> Continuous</span>
    <span class="cb"><span class="box">${radioChecked(a.nature_of_schooling, 'interrupted')}</span> Interrupted, why?</span><span class="fill med">${p(a.reason_for_stopping)}</span>
  </div>

  <div class="section-heading">III. HOME AND FAMILY BACKGROUND</div>

  <div class="field-line">
    <span class="field-label">Name of Father:</span><span class="fill" style="flex:2">${p(f.father_name)}</span>
    <span class="field-label">Age:</span><span class="fill short">${p(f.father_age)}</span>
    <span class="cb"><span class="box">${livingChecked(f.father_living_status, 'living')}</span> Living</span>
    <span class="cb"><span class="box">${livingChecked(f.father_living_status, 'deceased')}</span> Deceased</span>
  </div>
  <div class="field-line">
    <span class="field-label">Educational Attainment:</span><span class="fill med">${p(f.father_educational_attainment)}</span>
    <span class="field-label">Occupation:</span><span class="fill med">${p(f.father_occupation)}</span>
  </div>

  <div class="field-line">
    <span class="field-label">Name of Mother:</span><span class="fill" style="flex:2">${p(f.mother_name)}</span>
    <span class="field-label">Age:</span><span class="fill short">${p(f.mother_age)}</span>
    <span class="cb"><span class="box">${livingChecked(f.mother_living_status, 'living')}</span> Living</span>
    <span class="cb"><span class="box">${livingChecked(f.mother_living_status, 'deceased')}</span> Deceased</span>
  </div>
  <div class="field-line">
    <span class="field-label">Educational Attainment:</span><span class="fill med">${p(f.mother_educational_attainment)}</span>
    <span class="field-label">Occupation:</span><span class="fill med">${p(f.mother_occupation)}</span>
  </div>

  <div class="field-line">
    <span class="field-label">Name of Guardian (If any):</span><span class="fill" style="flex:2">${p(f.guardian_name)}</span>
    <span class="field-label">Age:</span><span class="fill short">${p(f.guardian_age)}</span>
  </div>
  <div class="field-line">
    <span class="field-label">Educational Attainment:</span><span class="fill med">${p(f.guardian_educational_attainment)}</span>
    <span class="field-label">Occupation:</span><span class="fill med">${p(f.guardian_occupation)}</span>
  </div>

  <div class="checkbox-row">
    <span class="field-label" style="margin-right:10px; display:block; margin-bottom:4px;">Parents' Marital Relationship: (Please Check)</span>
    <span class="cb"><span class="box">${radioChecked(f.parents_marital_status, 'single parent')}</span> Single Parent</span><br>
    <span class="cb"><span class="box">${radioChecked(f.parents_marital_status, 'married and staying together')}</span> Married and staying together</span>
    <span class="cb"><span class="box">${radioChecked(f.parents_marital_status, 'married but separated')}</span> Married but Separated</span><br>
    <span class="cb"><span class="box">${radioChecked(f.parents_marital_status, 'not married but together')}</span> Not married but living together</span>
    <span class="cb"><span class="box">${radioChecked(f.parents_marital_status, 'others')}</span> Other's (Please Specify)</span><span class="fill med">${p(f.other_marital_status_reason)}</span>
  </div>

  <div class="footer">1</div>
</div>

<div class="page">

  <div class="field-line">
    <span class="field-label">Number of children in the family including yourself:</span><span class="fill short">${p(f.number_of_children)}</span>
    <span class="field-label">Number of Brothers:</span><span class="fill short">${p(f.number_of_brothers)}</span>
    <span class="field-label">Number of Sisters:</span><span class="fill short">${p(f.number_of_sisters)}</span>
  </div>

  <div class="checkbox-row">
    <span class="field-label" style="margin-right:10px; display:block; margin-bottom:4px;">Who finances your schooling?</span>
    <span class="cb"><span class="box">${checked(a.financers === '1' ? '1' : '')}</span> Parents</span>
    <span class="cb"><span class="box">${checked(a.financers === '3' ? '1' : '')}</span> Spouse</span>
    <span class="cb"><span class="box">${checked(a.financers === '4' ? '1' : '')}</span> Relatives</span><br>
    <span class="cb"><span class="box">${checked(a.financers === '2' ? '1' : '')}</span> Brother/Sister</span>
    <span class="cb"><span class="box">${checked(a.financers === '6' ? '1' : '')}</span> Scholarship</span>
    <span class="cb"><span class="box">${checked(a.financers === '5' ? '1' : '')}</span> Self-supporting/working</span><br>
    <span class="cb"><span class="box">${a.other_financer ? '&#10003;' : '&nbsp;'}</span> Others, please specify:</span><span class="fill med">${p(a.other_financer)}</span>
  </div>

  <div class="section-heading">IV. HEALTH INFORMATION</div>

  <ol class="qnum">
    <li>
      Do you have problems with (Please Check)
      <div class="two-col-check" style="margin-top:6px;">
        <span class="cb"><span class="box">${checked(p_.vision_problem)}</span> Vision</span>
        <span class="cb"><span class="box">${checked(p_.speech_problem)}</span> Speech</span>
        <span class="cb"><span class="box">${checked(p_.hearing_problem)}</span> Hearing</span>
        <span class="cb"><span class="box">${checked(p_.health_problem)}</span> General Health</span>
        <span class="cb"><span class="box">${checked(p_.disability_problem)}</span> Physical Disability</span>
      </div>
      <div class="field-line"><span class="field-label">If yes, please specify:</span><span class="fill">${p((p_.vision_specify + ' ' + p_.speech_specify + ' ' + p_.hearing_specify + ' ' + p_.health_specify + ' ' + p_.disability_specify).trim())}</span></div>
    </li>
    <li>
      Have you been diagnosed of certain illnesses before? If yes, please specify:
      <span class="cb"><span class="box">${radioChecked(p_.diagnosed_before, 'yes')}</span> Yes</span>
      <span class="cb"><span class="box">${radioChecked(p_.diagnosed_before, 'no')}</span> No</span>
      <div class="fill" style="margin-top:6px;">${p(p_.diagnosed_specify)}</div>
    </li>
    <li>
      Have you taken any psychological tests before?
      <span class="cb"><span class="box">${radioChecked(p_.psych_test_before, 'yes')}</span> Yes</span>
      <span class="cb"><span class="box">${radioChecked(p_.psych_test_before, 'no')}</span> No</span>
    </li>
  </ol>

  <div style="font-weight:bold; margin-bottom:4px;">TEST RECORD</div>
  <table class="testrecord">
    <thead>
      <tr><th>Date</th><th>Kind of Test</th><th>Score</th><th>Rank</th></tr>
    </thead>
    <tbody>
      <tr><td>${p(p_.date1)}</td><td>${p(p_.test1)}</td><td>${p(p_.score1)}</td><td>${p(p_.rank1)}</td></tr>
      <tr><td>${p(p_.date2)}</td><td>${p(p_.test2)}</td><td>${p(p_.score2)}</td><td>${p(p_.rank2)}</td></tr>
      <tr><td>${p(p_.date3)}</td><td>${p(p_.test3)}</td><td>${p(p_.score3)}</td><td>${p(p_.rank3)}</td></tr>
    </tbody>
  </table>

  <div class="consent">
    <span class="box"></span>
    <span><i>I expressly consent to the collection and processing of my medical history and psychological assessment information in accordance with the Data Privacy Act of 2012.</i></span>
  </div>

  <div class="section-heading">V. OTHER INFORMATION</div>

  <ol class="qnum">
    <li>
      Indicate the interest group to which you are more inclined to. (Please Check)
      <div class="two-col-check" style="margin-top:6px;">
        <span class="cb"><span class="box">${checked(p_.sports)}</span> Sports</span>
        <span class="cb"><span class="box">${checked(p_.science)}</span> Science</span>
        <span class="cb"><span class="box">${checked(p_.civic_awareness)}</span> Civic Awareness/Service</span>
        <span class="cb"><span class="box">${checked(p_.arts)}</span> Arts</span>
        <span class="cb"><span class="box">${checked(p_.social_studies)}</span> Social Studies</span>
        <span class="cb"><span class="box">${p_.others_interests ? '&#10003;' : '&nbsp;'}</span> Others</span>
        <span class="cb"><span class="box">${checked(p_.religious)}</span> Religious</span>
      </div>
    </li>
    <li>
      Have you consulted/been sent to see the Guidance Counselor before?
      <span class="cb"><span class="box">${radioChecked(p_.consulted_status, 'yes')}</span> Yes</span>
      <span class="cb"><span class="box">${radioChecked(p_.consulted_status, 'no')}</span> No</span>
      <div class="field-line"><span class="field-label">If yes, what was/were the reason(s)?</span><span class="fill">${p(p_.reason_for_consultation)}</span></div>
    </li>
    <li>
      How may your Guidance Counselor help you? Please Check
      <div class="two-col-check" style="margin-top:6px;">
        <span class="cb"><span class="box">${checked(p_.family_matters)}</span> Family matters</span>
        <span class="cb"><span class="box">${checked(p_.career_concerns)}</span> Career concerns</span>
        <span class="cb"><span class="box">${checked(p_.relationship_concerns)}</span> Relationship problems</span>
        <span class="cb"><span class="box">${checked(p_.self_concerns)}</span> Self</span>
        <span class="cb"><span class="box">${checked(p_.concern_with_teachers)}</span> Concerns with teachers</span>
        <span class="cb"><span class="box">${checked(p_.financial_matters)}</span> Financial matters</span>
        <span class="cb"><span class="box">${checked(p_.academic_concerns)}</span> Academic concerns</span>
        <span class="cb"><span class="box">${checked(p_.health_concerns)}</span> Health concerns</span>
        <span class="cb"><span class="box">${p_.other_guidance_concern ? '&#10003;' : '&nbsp;'}</span> Others, please specify:</span><span class="fill med">${p(p_.other_guidance_concern)}</span>
      </div>
    </li>
  </ol>

  <p class="disclaimer">
    <b>DISCLAIMER</b>: I authorize the Guidance and Counseling Section, Division of Student Affairs, to collect and process my personal and sensitive information for academic support, counseling, emergency contact, and student profiling. I understand my data will be securely stored, accessed only by authorized personnel, and handled confidentially. I am aware of my rights under RA 10173 (Data Privacy Act of 2012), including access, correction, and withdrawal of consent at any time. My data will be retained for five (5) years and securely disposed of afterward.
  </p>

  <p>By signing below, I give my informed consent to the collection and use of my data as stated.</p>

  <div class="sig-block">
    <div class="sig-cols">
      <div><div class="sig-line">${p(fullName)}</div></div>
      <div><div class="sig-line"></div></div>
      <div style="flex:0 0 150px;"><div class="sig-line">${p(today)}</div></div>
    </div>
    <div class="sig-caption">
      <span style="flex:1; text-align:center;">Student's Printed Name</span>
      <span style="flex:1; text-align:center;">Student's Signature</span>
      <span style="flex:0 0 150px; text-align:center;">Date</span>
    </div>
  </div>

  <p style="margin-top:26px;"><b>Parental/Guardian Consent (for students under 18):</b></p>

  <div class="consent">
    <span class="box"></span>
    <span><i>I am the parent/legal guardian and I give my full consent for my child's participation in counseling services and data processing in compliance with the Data Privacy Act of 2012.</i></span>
  </div>

  <div class="sig-block">
    <div class="sig-cols">
      <div><div class="sig-line"></div></div>
      <div><div class="sig-line"></div></div>
      <div style="flex:0 0 150px;"><div class="sig-line"></div></div>
    </div>
    <div class="sig-caption">
      <span style="flex:1; text-align:center;">Parental/Guardian Printed Name</span>
      <span style="flex:1; text-align:center;">Relationship with the student</span>
      <span style="flex:0 0 150px; text-align:center;">Signature</span>
    </div>
  </div>

  <div class="footer">2</div>
</div>

</body>
</html>`
}

async function capturePage(el: HTMLElement): Promise<string> {
  const canvas = await html2canvas(el, {
    scale: 2,
    useCORS: true,
    logging: false,
    width: el.scrollWidth,
    height: el.scrollHeight,
  })
  return canvas.toDataURL('image/png')
}

export async function generateFormPdf(form: StudentFormDetail) {
  const container = document.createElement('div')
  container.innerHTML = buildFormHtml(form)
  container.style.position = 'fixed'
  container.style.left = '-9999px'
  container.style.top = '0'
  container.style.width = '8.5in'
  container.style.background = '#fff'
  container.style.zIndex = '-9999'
  document.body.appendChild(container)

  try {
    const pages = container.querySelectorAll<HTMLElement>('.page')
    const pdf = new jsPDF('p', 'mm', [215.9, 330.2])
    const pdfWidth = pdf.internal.pageSize.getWidth()

    const pagesArr = Array.from(pages)
    for (let i = 0; i < pagesArr.length; i++) {
      if (i > 0) pdf.addPage()
      const imgData = await capturePage(pagesArr[i])
      const img = new Image()
      img.src = imgData
      await img.decode()
      const pdfHeight = (img.height * pdfWidth) / img.width
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    }

    pdf.save(`DSA-Form-${form.id_number}.pdf`)
  } finally {
    document.body.removeChild(container)
  }
}
