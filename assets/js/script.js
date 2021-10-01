var currentDate = moment().format("dddd MMMM Do");
$("#currentDay").text(currentDate);

const times = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
const timeInBlock = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const timeBlocks = $("#time-block-container");

var scheduleStored = [];

var loadSchedule = function() {
    scheduleStored = JSON.parse(localStorage.getItem("schedule"));
    if (!scheduleStored) {
        scheduleStored = [];
    }
};

for (var index = 0; index < times.length; index++) {



    var row = $("<div class='row time-block'>").attr("id", timeInBlock[index]);
    var time = $("<div class='hour col-1'>")
    var textArea = $("<textarea class='col-10 text-area'>");
    var saveButton = $("<button class='saveBtn col-1 far fa-save'>");

    timeBlocks.append(row);
    textArea.attr("id", times[index]);
    time.text(times[index]);
    row.append(time);
    row.append(textArea);
    saveButton.text();
    row.append(saveButton);

    loadSchedule();
    var scheduleTime = times[index];
    $.each(scheduleStored, function(index, scheduledItem) {
        console.log(scheduledItem.time, scheduledItem.scheduleItem);
        if (scheduledItem.time == scheduleTime) {
            textArea.text(scheduledItem.scheduleItem)
        }
    });

};

function updateHour() {
    var currentHour = moment().hours();
    $(".time-block").each(function () {
        var blockTime = parseInt($(this).attr("id").split(" ")[0]);

        if (blockTime < currentHour) {
            $(this).addClass("past");
        } else if (blockTime === currentHour) {
            $(this).addClass("present");
        } else {
            $(this).addClass("future");
        }
    });
}
updateHour();

$(".saveBtn").on("click", function () {

    var selectHour = $(this).siblings(".hour").text();
    var text = $(this).siblings(".text-area").val();

    scheduleObj = {
        time: selectHour,
        scheduleItem: text
    };

    for (var index = 0; index < scheduleStored.length; index++) {
        if (scheduleStored[index].time == selectHour) {
            scheduleStored.splice(index, 1);
        };
    };
    scheduleStored.push(scheduleObj);

    localStorage.setItem("schedule", JSON.stringify(scheduleStored));
});

loadSchedule();
