// ==UserScript==
// @name        BlockDuplicate
// @namespace   Violentmonkey Scripts
// @match      https://admin.crimson.*.prd.maxbit.private/admin/players/*
// @grant       none
// @version     1.0
// @author      v.korenevskii
// ==/UserScript==
(async function () {
  const token = document.querySelector("[name='csrf-token']").content
  const action_items = document.querySelector(".action_items")
  let duplicatesBlock = Array.from(document.querySelectorAll(".duplicates_table_container ul li"))
  const currentPlayerMail = document.querySelector(".edit-email-player")?.innerHTML
  const toDos = document.querySelector("#duplications_sidebar_section div div")
  const admin = document.querySelector(".header-item.tabs #current_user").innerText
  const enhancerDuplicatesList = Array.from(document.querySelectorAll("#sdt_duplicates_panel td a[target='_blank']"))
  const duplicatesBottomList = Array.from(document.querySelectorAll(".duplicates_table .duplicates_item a"))
  const currentPlayerId = window.location.href.split("/")[5]
  let text
  const isDuplicate = window.location.href.split("/")[6] == "#"
  let counter = 0
  const comments = Array.from(document.querySelectorAll(".active_admin_comment_body p"))
  const duplicateMaxBalance = {
    KZT: 500,
    RUB: 100,
    UAH: 40,
    USD: 1,
    EUR:1,
  }
//1111111111111111111111111111111111111111111111111111111
  const sendComments = async (text, id) => {
    let formData = new FormData()
    formData.append('authenticity_token', token);
    formData.append('active_admin_comment[resource_type]', 'User');
    formData.append('active_admin_comment[resource_id]', id);
    formData.append('active_admin_comment[body]', text);
    formData.append('commit', 'Добавить Комментарий');
    const sendComment = await fetch(
      `https://${window.location.host}/admin/comments`,
      {
        method: "POST",
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
          "path": "/admin/comments",
          "cache-control": "max-age=0",
          "sec-ch-ua":
            '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-origin",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
        },
        referrer:
          "https://marketing-izzi.lux-casino.co/admin/payments?q%5Buser_email_eq%5D=lipisinkand%40yandex.ru",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: formData,
        method: "POST",
        mode: "cors",
        credentials: "include",
      }
    )
  }

  const blockUser = async (id) => {
    let formData = new FormData()
    formData.append('authenticity_token', token);
    const blockUser = await fetch(
      `https://${window.location.host}/admin/players/${id}/update_status?status=disable`,
      {
        method: "POST",
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
          "path": `/admin/players/${id}/update_status?status=disable`,
          "cache-control": "max-age=0",
          "sec-ch-ua":
            '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-origin",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
        },
        referrer:
          "https://marketing-izzi.lux-casino.co/admin/payments?q%5Buser_email_eq%5D=lipisinkand%40yandex.ru",
        referrerPolicy: "strict-origin-when-cross-origin",
        method: "POST",
        body: formData,
        mode: "cors",
        credentials: "include",
      }
    )
  }
  const editMail = async (id, mail) => {
    let formData = new FormData()
    formData.append('_method', "patch");
    formData.append('authenticity_token', token);
    formData.append('user[email]', mail)
    formData.append('commit', "Обновить")
    const blockUser = await fetch(
      `https://${window.location.host}/admin/players/${id}/edit_email`,
      {
        method: "POST",
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
          "path": `/admin/players/${id}/edit_email`,
          "cache-control": "max-age=0",
          "sec-ch-ua":
            '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-origin",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
        },
        referrer:
          "https://marketing-izzi.lux-casino.co/admin/payments?q%5Buser_email_eq%5D=lipisinkand%40yandex.ru",
        referrerPolicy: "strict-origin-when-cross-origin",
        method: "POST",
        body: formData,
        mode: "cors",
        credentials: "include",
      }
    )
  }

  const deactivateNumber = async (id) => {
    let formData = new FormData()
    formData.append('_method', "patch");
    formData.append('authenticity_token', token);
    const blockUser = await fetch(
      `https://${window.location.host}/admin/players/${id}/phones/deactivate`,
      {
        method: "POST",
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
          "path": `/admin/players/${id}/phones/deactivate`,
          "cache-control": "max-age=0",
          "sec-ch-ua":
            '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-origin",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
        },
        referrer:
          "https://marketing-izzi.lux-casino.co/admin/payments?q%5Buser_email_eq%5D=lipisinkand%40yandex.ru",
        referrerPolicy: "strict-origin-when-cross-origin",
        method: "POST",
        body: formData,
        mode: "cors",
        credentials: "include",
      }
    )
  }
  enhancerDuplicatesList.forEach(elem => {
    comments.forEach(comentElem => {
      if (comentElem.innerText.includes(elem.innerText))
        elem.parentElement.parentElement.querySelector("td").addEventListener("click", () => { alert(comentElem.innerText) })
    })
    for (let item of duplicatesBottomList) {
      if (item.innerText == elem.innerText)
        elem.href = item.href + "/#"
    }

  })
  if (isDuplicate) {
    const duplicateCurency = document.querySelector(".yes")
    const duplicateBalance = duplicateCurency.parentElement.parentElement.cells[2]
    if (parseInt(duplicateBalance.textContent) >= duplicateMaxBalance[duplicateCurency.innerText]) {
      alert("BALANCE!!!!")
      document.querySelector("#wrapper").style.cssText = "background:red;"
      duplicateBalance.style.cssText = "font-size:20px;"
    }

  }


  const copyText = (text) => {
    setTimeout(async () => console.log(
      await window.navigator.clipboard.writeText(text)), 100)
  }

  const reload = async (func) => {
    await func
    location.reload()
  }

  const mapDuplicatesMail = (duplicatesArray) => {
    let result = duplicatesArray.map((elem) => { return elem.mail })
    return result.join(", ")
  }

  const mapDuplicatesWhoes = (duplicatesArray) => {
    let result = duplicatesArray.map((elem) => {
      if (elem.who == "" || elem.who == null)
        return
      return `Аккаунт ${elem.mail} принадлежит ${elem.who}. `
    })
    return result.join(" ")
  }

  const getDuplicateMailAndId = (elem) => {
    let elemMail = elem.querySelector(".duplicates_item div div").innerText
    let elemId = elem.querySelector(".duplicates_item div a").href.split("/")[5]
    return { mail: elemMail, id: elemId }
  }

  const userHaveMail = (mail) => {
    const projects = ["fresh", "sol", "volna", "jet", "starda", "rox", "drip", "izzi", "legzo"]
    for (let project of projects) {
      if (mail.includes(project + ".casino") || mail.includes(project + "casino.com"))
        return false
    }
    return true
  }

  const getMaskOfNumber = (number) => {
    number = number.split("")
    for (let i = 0; i < number.length; i++) {
      if (i > number.length - 9 && i < number.length - 4)
        number[i] = "*"
    }
    number = number.join("")
    return number
  }

  const blockDuplicate = async (id, mail,) => {
    sendComments(`Дубликат. Основной профиль игрока ${userHaveMail(mail) ? mail : mail + " ID: " + currentPlayerId}`, id)
    blockUser(id)
  }

  const knowProfile = async (id, mail, call) => {
    text = call != "" && call != null? `Со слов игрока ${userHaveMail(mail) ? mail : mail + " ID: " + currentPlayerId} данный аккаунт принадлежит ${call}.` : `Со слов игрока ${userHaveMail(mail) ? mail : mail + " ID: " + currentPlayerId} данный аккаунт знаком`
    sendComments(text, id)
  }

  const blockDuplicates = (block) => {
    let ok = confirm("Are you sure " + block + "?")
    let duplicates = []
    let moreThanTwo = () => {
      return duplicates.length < 2
    }
    if(ok)
      document.querySelector("*").style.cssText = "pointer-events: none;"
    switch (block) {
      case "Блокировка":
        if (!ok)
          return
        duplicatesBlock.forEach(elem => {
          if (elem.querySelector("input").checked) {
            let { mail, id } = getDuplicateMailAndId(elem)
            let addedDuplicate = { mail: !userHaveMail(mail) ? mail + ` ID: ${id}` : mail }
            if (duplicates.some(elem => elem.mail == addedDuplicate.mail)) {
              return
            }
            duplicates.push(addedDuplicate)
            blockDuplicate(id, currentPlayerMail)
          }
        })
        if(duplicates.length == 0)
          return
        text = moreThanTwo() ? `Аккаунт ${mapDuplicatesMail(duplicates)} заблокирован как дублирующий.` : `Аккаунты ${mapDuplicatesMail(duplicates)} заблокированы как дублирующие.`
        reload(sendComments(text, currentPlayerId))
        break
      case "Блокировка + duplicate":
        if (!ok)
          return
        duplicatesBlock.forEach(elem => {
          if (elem.querySelector("input").checked) {
            let { mail, id } = getDuplicateMailAndId(elem)
            let editedMail = mail.split("@")
            editedMail.push("+duplicate+@")
            editedMail[2] = editedMail.splice(1, 1, editedMail[2])[0];
            editedMail = editedMail.join("")
            editMail(id, editedMail)
            let addedDuplicate = { mail: !userHaveMail(mail) ? mail + ` ID: ${id}` : editedMail }
            if (duplicates.some(elem => elem.mail == addedDuplicate.mail)) {
              return
            }
            duplicates.push(addedDuplicate)
            blockDuplicate(id, currentPlayerMail)
          }
        })
        if(duplicates.length == 0)
          return
        text = moreThanTwo() ? `Аккаунт ${mapDuplicatesMail(duplicates)} заблокирован как дублирующий.` : `Аккаунты ${mapDuplicatesMail(duplicates)} заблокированы как дублирующие.`
        reload(sendComments(text, currentPlayerId))
        break
      case "Блокировка + деактивация номера":
        if (!ok)
          return
        duplicatesBlock.forEach(elem => {
          if (elem.querySelector("input").checked) {
            let { mail, id } = getDuplicateMailAndId(elem)
            deactivateNumber(id)
            let addedDuplicate = { mail: !userHaveMail(mail) ? mail + ` ID: ${id}` : mail }
            if (duplicates.some(elem => elem.mail == addedDuplicate.mail)) {
              return
            }
            duplicates.push(addedDuplicate)
            blockDuplicate(id, currentPlayerMail)
          }
        })
        if(duplicates.length == 0)
          return
        text = moreThanTwo() ? `Аккаунт ${mapDuplicatesMail(duplicates)} заблокирован как дублирующий.` : `Аккаунты ${mapDuplicatesMail(duplicates)} заблокированы как дублирующие.`
        reload(sendComments(text, currentPlayerId))
        break
      case "Знаком":
        if (!ok)
          return
        duplicatesBlock.forEach(elem => {
          if (elem.querySelector("input").checked) {
            let { mail, id } = getDuplicateMailAndId(elem)
            let addedDuplicate = { mail: !userHaveMail(mail) ? mail + ` ID: ${id}` : mail }
            if (duplicates.some(elem => elem.mail == addedDuplicate.mail))
              return
            let call = prompt(mail)
            duplicates.push({
              mail: addedDuplicate.mail,
              who: call
            })
            knowProfile(id, currentPlayerMail, call)
          }
        })
        if(duplicates.length == 0)
          return
        text = moreThanTwo() ? `Со слов игрока аккаунт ${mapDuplicatesMail(duplicates)} знаком. ` + mapDuplicatesWhoes(duplicates) : ` Со слов игрока аккаунты ${mapDuplicatesMail(duplicates)} знакомы. ` + mapDuplicatesWhoes(duplicates)
        reload(sendComments(text, currentPlayerId))
        break
      case "Незнаком":
        if (!ok)
          return
        duplicatesBlock.forEach(elem => {
          if (elem.querySelector("input").checked) {
            let { mail, id } = getDuplicateMailAndId(elem)
            let addedDuplicate = { mail: !userHaveMail(mail) ? mail + ` ID: ${id}` : mail }
            if (duplicates.some(elem => elem.mail == addedDuplicate.mail))
              return
            duplicates.push(addedDuplicate)
          }
        })
        if(duplicates.length == 0)
          return
        text = duplicates.length < 2 ? `Со слов игрока аккаунт ${mapDuplicatesMail(duplicates)} незнаком.` : `Со слов игрока аккаунты ${mapDuplicatesMail(duplicates)} незнакомы.`
        reload(sendComments(text, currentPlayerId))
        break
    }

  }
  duplicatesBlock.forEach(elem => {
    let cssStylesTextOfElem = "display: flex; column-gap: 15px; margin-top:10px;"
    elem.style.cssText = cssStylesTextOfElem
    let check = document.createElement('input');
    check.style.marginLeft = "-17px"
    check.type = 'checkbox';
    check.style.cssText = "margin-top:6px; height:10px; width:10px; margin-left:-20px;  transform: scale(2);"
    elem.insertBefore(check, elem.children[0]);
    comments.forEach(commentElem => {
      if (commentElem.innerText.includes(elem.querySelector("a").innerText)) {
        elem.style.cssText = cssStylesTextOfElem + "font-weight:bold;"
      }
    }
    )
  })

  const buttons = [
    {
      text: "Блокировка"
    },
    {
      text: "Блокировка + duplicate"
    },
    {
      text: "Блокировка + деактивация номера"
    },
    {
      text: "Знаком"
    },
    {
      text: "Незнаком"
    }]

  toDos.style.cssText = "display:flex; flex-direction: column; row-gap: 3px;"
  buttons.forEach((elem, index) => {
    const newButton = document.createElement('a')
    newButton.style.cssText = "cursor:pointer;"
    newButton.textContent = elem.text
    newButton.addEventListener("click", () => blockDuplicates(elem.text))
    toDos.insertBefore(newButton, toDos.children[index + 2]);
  })


  const actionItemsBlock = async (action) => {
    switch (action) {
      case "Удалить":
        if (!confirm("Are you sure? "))
          return
        blockUser(currentPlayerId)
        let reason = prompt("Причина удаления")
        sendComments(`Аккаунт удален по запросу игрока. Причина:${reason==""|| reason==null?" не уточнил":reason}`, currentPlayerId)
        reload()
        break
      case "Скопировать номер телефона":
        let number = document.querySelector("input#phone_number").value
        if (counter == 0) {
          copyText(getMaskOfNumber(number))
          counter++
          return
        }
        if (counter == 1) {
          copyText(window.location.href + " Позвоните, пожалуйста, для подтверждения номера. " + number)
          counter = 0
          return
        }
        break
    }
  }
  const actions = [
    { text: "Удалить" },
    { text: "Скопировать номер телефона" }
  ]
  actions.forEach(elem => {
    const newActionItem = document.createElement("span")
    newActionItem.classList.add("action_item")
    newActionItem.innerHTML = `<a>${elem.text}</a>`
    newActionItem.style.cssText = "cursor:pointer;"
    newActionItem.addEventListener("click", () => {
      actionItemsBlock(elem.text)
    })
    action_items.insertBefore(newActionItem, action_items.children[0])
  })
})();
