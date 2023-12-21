var boldState = false;
var italicState = false;

function sendMessage(side) {
  var messageInput = $("#" + side + "Message");
  var message = messageInput.val().trim();

  if (message !== "") {
    var chatbox = $("." + side + " .msg");
    var newMessageWrapper = $("<div class='message-wrapper'></div>");

    var newMessage = $("<p></p>").text(message);

    var fontStyle = messageInput.css("fontStyle");
    var fontWeight = messageInput.css("fontWeight");

    if (fontStyle) {
      newMessage.css("fontStyle", fontStyle);
    }
    if (fontWeight) {
      newMessage.css("fontWeight", fontWeight);
    }

    if (side === "right" || side === "left") {
      newMessage.addClass("sent");
    }

    newMessageWrapper.append(newMessage);
    chatbox.append(newMessageWrapper);

    messageInput.val("");

    var otherSide = side === "left" ? "right" : "left";
    var otherChatbox = $("." + otherSide + " .msg");
    var otherNewMessageWrapper = $("<div class='message-wrapper'></div>");

    var otherNewMessage = $("<p></p>").text("Received: " + message);

    if (fontStyle) {
      otherNewMessage.css("fontStyle", fontStyle);
    }
    if (fontWeight) {
      otherNewMessage.css("fontWeight", fontWeight);
    }

    if (otherSide === "left" || otherSide === "right") {
      otherNewMessage.addClass("received");
    }

    otherNewMessageWrapper.append(otherNewMessage);
    otherChatbox.append(otherNewMessageWrapper);
  }
}

function applyItalic(style, side) {
  var messageInput = $("#" + side + "Message");
  italicState = !italicState;
  messageInput.css("fontStyle", italicState ? style : "");
}

function applyBold(style, side) {
  var messageInput = $("#" + side + "Message");
  boldState = !boldState;
  messageInput.css("fontWeight", boldState ? style : "");
}

function resetInput(side) {
  var messageInput = $("#" + side + "Message");
  messageInput.val("");
}

// Gán sự kiện cho các nút sử dụng jQuery
$(".send-msg button").on("click", function () {
  var side = $(this).closest(".chatbox").hasClass("left") ? "left" : "right";
  sendMessage(side);
});

$(".control-button button").on("click", function () {
  var side = $(this).closest(".chatbox").hasClass("left") ? "left" : "right";
  var styleType = $(this).data("style");
  if (styleType === "italic") {
    applyItalic("italic", side);
  } else if (styleType === "bold") {
    applyBold("bold", side);
  }
});

$(".send-msg button").on("reset", function () {
  var side = $(this).closest(".chatbox").hasClass("left") ? "left" : "right";
  resetInput(side);
});
