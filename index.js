function emailIsValue(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function save() {
  let fullName = document.querySelector("#full-name").value;
  let email = document.querySelector("#email").value;
  let phone = document.querySelector("#phone").value;
  let address = document.querySelector("#address").value;
  let gender1 = document.getElementById("male");
  let gender2 = document.getElementById("famale");
  let gender = "";
  /*genderValue*/
  if (gender1.checked) {
    gender = gender1.value;
  } else if (gender2.checked) {
    gender = gender2.value;
  }
  /*FulLName*/
  if (fullName == "") {
    fullName = "";
    document.querySelector("#fullname-error").innerHTML =
      "Vui Lòng Nhập Tên Của Bạn";
  } else if (fullName.trim().length <= 2) {
    fullName = "";
    document.querySelector("#fullname-error").innerHTML =
      "Số Ký Tự Phải Lớn Hơn 2";
  } else if (fullName.trim().length > 50) {
    fullName = "";
    document.querySelector("#fullname-error").innerHTML =
      "Số Ký Tự Không Lớn Hơn 2";
  } else {
    document.querySelector("#fullname-error").innerHTML = " ";
  }
  /*Email*/
  if (email == "") {
    email = "";
    document.querySelector("#email-error").innerHTML =
      "Nhập Email Của Bạn Của Bạn";
  } else if (!emailIsValue(email)) {
    email = "";
    document.querySelector("#email-error").innerHTML =
      "Email Không đúng định dạng";
  } else {
    document.querySelector("#email-error").innerHTML = " ";
  }
  /*Phone*/
  if (phone == "") {
    phone = "";
    document.querySelector("#phone-error").innerHTML =
      " Nhập Số Điện Thoại Của Bạn";
  } else if (phone.trim().length > 10) {
    phone = "";
    document.querySelector("#phone-error").innerHTML =
      "Số Điện Thoại Không Đúng";
  } else {
    document.querySelector("#phone-error").innerHTML = " ";
  }
  /*Address*/
  if (address == "") {
    address = "";
    document.querySelector("#address-error").innerHTML =
      "Nhập Địa Chỉ Của Bạn Của Bạn";
  } else {
    document.querySelector("#address-error").innerHTML = " ";
  }
  /*Gender*/
  if (gender == "") {
    gender = "";
    document.querySelector("#gender-error").innerHTML =
      "Vui Lòng Chọn Giới Tính";
  } else {
    document.querySelector("#gender-error").innerHTML = " ";
  }
  if (fullName && email && phone && address && gender) {
    let students = localStorage.getItem("students")
      ? JSON.parse(localStorage.getItem("students"))
      : [];
    students.push({
      fullName: fullName,
      email: email,
      phone: phone,
      address: address,
      gender: gender,
    });
    localStorage.setItem("students", JSON.stringify(students));
    this.renderStudents();
  }
}
function renderListStudents() {
  let students = localStorage.getItem("students")
    ? JSON.parse(localStorage.getItem("students"))
    : [];
  if (students.length === 0) {
    document.getElementById("hiden").style.display = "none";
    return false;
  }
  document.getElementById("hiden").style.display = "block";
  let contentTable = `<tr>
          <td width='5'>Stt</td>
          <td width='200'>Họ và Tên</td>
          <td width='150'>Email</td> 
          <td width='70'>Điện Thoại</td>
          <td width='400'>Địa chỉ</td>
          <td width='100'>Giới Tính </td>
          <td width='90'>Hành Động</td>
      </tr>`;
  students.forEach((student, index) => {
    studentsId = index;
    index++;
    let genderLabel = parseInt(student.gender) === 1 ? "Nam" : "Nữ";
    contentTable += `
              <tr>
                  <td>${index}</td>
                  <td>${student.fullName}</td>
                  <td>${student.email}</td>
                  <td>${student.phone}</td>
                  <td>${student.address}</td>
                  <td>${genderLabel}</td>
                  <td>
                      <i class='bx bxs-x-circle' onclick="deleteStudent(${studentsId})"></i> | <i class='bx bxs-edit-alt'></i>
                  </td>
              </tr>`;
  });
  document.querySelector(".list-student table").innerHTML = contentTable;
}
function deleteStudent(id) {
  let students = localStorage.getItem("students")
    ? JSON.parse(localStorage.getItem("students"))
    : [];
  students.splice(id, 1);
  console.log(students);
  localStorage.setItem("students", JSON.stringify(students));
  renderListStudents();
}
