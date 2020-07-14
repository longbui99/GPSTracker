// Generate origin element
let countTime = 0;
let IpLong = document.getElementById("logitude");
let IpLat = document.getElementById("latitude");
let map;
let circle;
let marker;

// Get origin data, set to orign element
$.ajax({
    url: "/cli-main/get-gps-information",
    type: "POST",
}).done((result) => {
    $("#zone-panel").hide();
    $("#lat-lng-rad").hide();

    //default map view
    initMap(30, 30, 2);
    //Create a list of gps devices
    i = 1;
    result.forEach((device) => {
        $("#device-buttons-container").append(
            $(
                " <button id='" +
                device._id +
                "' class='btn btn-outline-secondary ml-2 mb-2 force-overflow' type='button' id='button-addon2'>GPS " +
                i +
                "</button>"
            ).on("click", function () {
                $("edit-btn").trigger("click")
                $("#zone-panel").hide();
                $("#lat-lng-rad").hide();
                $("input.input-new-lat-lng-rad").val("")

                // toggle buttons
                $("#device-buttons-container").off("click")
                $("#device-buttons-container").on("click", '.btn', () => {
                    $(this).addClass('active').siblings().removeClass('active');
                })

                //focus map
                initMap(device.DeviceData.Latitude, device.DeviceData.Longitude, 5);

                //create marker for that gps

                if (marker) marker.setMap(null);
                marker = new google.maps.Marker({
                    position: {
                        lat: parseFloat(device.DeviceData.Latitude),
                        lng: parseFloat(device.DeviceData.Longitude),
                    },
                    map,
                    // icon:'../Client/DviceMain/gps64.png'
                });

                $("#edit-btn-container").empty();
                $("#edit-btn-container").append(
                    $(
                        " <button class='btn btn-outline-secondary align-middle btn-block' type='button' id='edit-btn'>Edit</button>"
                    ).on("click", function () {
                        $("#lat-lng-rad").hide();

                        //get safe Zone
                        $.ajax({
                            url: "/cli-main/get-zone-information",
                            type: "POST",
                            data: {
                                GPSID: device._id,
                            },
                        }).done((zones) => {
                            j = 1;
                            $(".zone-buttons-container").empty();
                            $("#zone-panel").show();
                            zones.forEach((zone) => {
                                $(".zone-buttons-container").append(
                                    $(
                                        " <button class='btn btn-outline-secondary mb-2' type='button' id='" +
                                        zone._id + "'>Zone " +
                                        j +
                                        "</button>"
                                    ).on("click", function () {
                                        // toggle buttons
                                        $(".zone-buttons-container").off("click")
                                        $(".zone-buttons-container").on("click", '.btn', () => {
                                            $(this).addClass('active').siblings().removeClass('active');

                                        })

                                        $("#lat-lng-rad").show();
                                        /**/
                                        $(".input-lat-lng-rad").off("change keyup blur");
                                        $("#update-btn").off("click");
                                        if (circle) circle.setMap(null);

                                        circle = new google.maps.Circle({
                                            strokeColor: "#FF0000",
                                            strokeOpacity: 0.8,
                                            strokeWeight: 2,
                                            fillColor: "#FF0000",
                                            fillOpacity: 0.35,
                                            map,
                                            center: {
                                                lat: zone.Data[1],
                                                lng: zone.Data[0],
                                            },
                                            radius: zone.Radius,
                                        });

                                        //focus map and default
                                        mapFocus(circle)

                                        $("#logitude").val(circle.getCenter().lng());
                                        $("#latitude").val(circle.getCenter().lat());
                                        $("#radius").val(circle.getRadius());

                                        //Input direct to the form
                                        $(".input-lat-lng-rad").on(
                                            "change keyup blur",
                                            function (event) {

                                                // //only allow numeric
                                                if (!inputValidate(this)) {
                                                    $("#update-btn").attr("disabled", true)
                                                    $("#update-btn").addClass("disable-cursor")

                                                    $("#input-alert").show("fade");
                                                    $("#close-input-alert").on("click", function () {
                                                        $("#input-alert").hide("fade");
                                                    })

                                                } else {
                                                    $("#update-btn").attr("disabled", false)
                                                    $("#update-btn").removeClass("disable-cursor")
                                                    $("#input-alert").hide("fade");

                                                    //click outside to preview circle
                                                    $(".container-fluid").on("click", function (e) {
                                                        if (
                                                            !$(".input-lat-lng-rad").is(e.target) &&
                                                            $(".input-lat-lng-rad").has(e.target).length === 0
                                                        ) {
                                                            circle.setCenter({
                                                                lat: $("#latitude").val() === "" ?
                                                                    circle.getCenter().lat() : parseFloat($(
                                                                        "#latitude").val()),

                                                                lng: $("#logitude").val() === "" ?
                                                                    circle.getCenter().lng() : parseFloat($(
                                                                        "#logitude").val()),
                                                            });
                                                            circle.setRadius(
                                                                $("#radius").val() === "" ?
                                                                circle.getRadius() :
                                                                parseFloat($("#radius").val())
                                                            );

                                                            $(".container-fluid").off("click");
                                                            // google.maps.event.trigger(circle, "dblclick");
                                                        }
                                                    });
                                                }

                                            }
                                        );

                                        //Or change via editting the circle
                                        google.maps.event.addListener(
                                            circle,
                                            "dblclick",
                                            function (event) {

                                                let onMapclick;

                                                if (event) event.stop();

                                                //circle become editable
                                                circle.setEditable(true);
                                                mapFocus(circle)

                                                //show warning if lat, lng or rad is empty

                                                //change circle center listener
                                                google.maps.event.addListener(
                                                    circle,
                                                    "center_changed",
                                                    function (event) {
                                                        $("#logitude").val(circle.getCenter().lng());
                                                        $("#latitude").val(circle.getCenter().lat());
                                                        google.maps.event.clearListeners(circle, 'center_changed')
                                                    }
                                                );

                                                //change circle radius listener
                                                google.maps.event.addListener(
                                                    circle,
                                                    "radius_changed",
                                                    function (event) {
                                                        $("#radius").val(circle.getRadius());
                                                        google.maps.event.clearListeners(circle, 'radius_changed')
                                                    }
                                                );

                                                onMapclick = google.maps.event.addListener(
                                                    map,
                                                    "click",
                                                    function (event) {
                                                        google.maps.event.removeListener(onMapclick)
                                                        $("#panel").off("click")
                                                        circle.setEditable(false);
                                                    }
                                                );

                                                $("#panel").on("click", () => {
                                                    google.maps.event.removeListener(onMapclick)
                                                    circle.setEditable(false);
                                                    $("#panel").off("click")
                                                })
                                                // 
                                                // 
                                            }

                                        );


                                        //
                                        $("#confirm-update").off("click")
                                        $("#confirm-update").on("click", () => {
                                            // Update gps coordinates, realtime response with socket
                                            $.ajax({
                                                url: "/cli-main/update-zone-latLngRad",
                                                type: "POST",
                                                data: {
                                                    _id: zone._id,
                                                    OwnerId: zone.OwnerId,
                                                    GPSID: zone.GPSID,
                                                    Long: IpLong.value === "" ?
                                                        zone.Data[0] : IpLong.value,
                                                    Lat: IpLat.value === "" ? zone.Data[1] : IpLat.value,
                                                    Radius: $("#radius").val() === "" ?
                                                        zone.Radius : $("#radius").val(),
                                                },
                                            }).done((res) => {
                                                //console.log(res);

                                                $("#my-success").show("fade");
                                                $("#my-success").fadeTo(2000, 500).slideUp(500, () => {
                                                    $("my-succuess").slideUp(500)
                                                    $("#my-success").hide("fade");
                                                })

                                                $("#edit-btn").trigger("click");
                                            });

                                        });

                                        // 
                                        $("#confirm-delete").off("click")
                                        $("#confirm-delete").on("click", () => {
                                            // delete zone
                                            $.ajax({
                                                type: "POST",
                                                url: "/cli-main/delete-zone",
                                                data: {
                                                    _id: zone._id,
                                                    GPSID: zone.GPSID,
                                                }
                                            }).done((res) => {

                                                if (circle) circle.setMap(null);
                                                $("#edit-btn").trigger("click");

                                                $("#my-success").show("fade");
                                                $("#my-success").fadeTo(2000, 500).slideUp(500, () => {
                                                    $("my-succuess").slideUp(500)
                                                    $("#my-success").hide("fade");
                                                })
                                                //console.log(res);
                                            });
                                        })
                                    })
                                );
                                j++;
                            });
                        });

                        $(".input-new-lat-lng-rad").off("change keyup blur")
                        $(".input-new-lat-lng-rad").on(
                            "change keyup blur",
                            function (event) {

                                // //only allow numeric
                                if (!inputValidate(this)) {
                                    $("#add-new-zone-btn").attr("disabled", true)
                                    $("#add-new-zone-btn").addClass("disable-cursor")

                                    $("#input-alert").show("fade");
                                    $("#close-input-alert").on("click", function () {
                                        $("#input-alert").hide("fade");
                                    })

                                } else {
                                    $("#add-new-zone-btn").attr("disabled", false)
                                    $("#add-new-zone-btn").removeClass("disable-cursor")
                                    $("#input-alert").hide("fade");
                                    $("#my-alert").hide("fade");
                                }

                            });


                        // 
                        $("#add-new-zone-btn").off("click")
                        $("#add-new-zone-btn").on("click", () => {

                            if (
                                // alert
                                $("#new-lat").val() === "" ||
                                $("#new-lng").val() === "" ||
                                $("#new-rad").val() === "") {
                                $("#add-new-zone-btn").removeAttr("data-toggle")
                                $("#add-new-zone-btn").removeAttr("data-target")

                                $("#my-alert").show("fade");
                                $("#close-alert").on("click", function () {
                                    $("#my-alert").hide("fade");
                                });
                            } else {

                                $("#add-new-zone-btn").attr("data-toggle", "modal")
                                $("#add-new-zone-btn").attr("data-target", "#confirm-add-zone-box")

                                //add zone
                                $("#confirm-add").off("click")
                                $("#confirm-add").on("click", () => {

                                    $.ajax({
                                        url: "/cli-main/add-new-zone",
                                        type: "POST",
                                        data: {
                                            GPSID: device._id,
                                            Lat: $("#new-lat").val(),
                                            Long: $("#new-lng").val(),
                                            Radius: $("#new-rad").val(),
                                        },
                                    }).done((res) => {
                                        //console.log(res);
                                        $("#new-lat").val("")
                                        $("#new-lng").val("")
                                        $("#new-rad").val("")

                                        $("#edit-btn").trigger("click");

                                        // success
                                        $("#my-alert").hide("fade");
                                        $("#my-success").show("fade");
                                        $("#my-success").fadeTo(2000, 500).slideUp(500, () => {
                                            $("my-succuess").slideUp(500)
                                            $("#my-success").hide("fade");
                                        })
                                    });
                                })

                            }
                        })
                    })
                );
            })
        );
        i++;
    });
});

$("#start-add-zone-btn").off("click")
$("#start-add-zone-btn").on("click", () => {
    map.setOptions({
        draggableCursor: "url(../Client/DviceMain/iconfinder30.png) 15 15, crosshair"
    })
    mouseMove = map.addListener("mousemove", (e) => {
        $("#new-lat").val(e.latLng.lat())
        $("#new-lng").val(e.latLng.lng())
    })
    map.addListener("click", () => {
        // google.maps.event.removeListener(mouseMove)
        google.maps.event.clearListeners(map, 'mousemove')
        google.maps.event.clearListeners(map, 'click')
        map.setOptions({
            draggableCursor: null
        })
    })
})

function mapFocus(circle) {
    map.panTo(circle.getCenter());
    map.setZoom(22 - (Math.log(circle.getRadius() / 12.4) / Math.log(2)));
}

//function create map
function initMap(lat, lng, zoom) {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: parseFloat(lat),
            lng: parseFloat(lng)
        },
        zoom,
    });
}

function inputValidate(input) {
    var pattern = /[+-]?([0-9]*[.])?[0-9]+/
    match = $(input).val().match(pattern)
    return match && $(input).val() === match[0]
}

// Initial  socket connection (real time connection)
const socket = io.connect("http://localhost:5000");
// const socket = io.connect('https://getdateset.herokuapp.com')

// Sign socket with user id, and remove it in client-view
document.addEventListener("DOMContentLoaded", function () {
    socket.emit(
        "sign-in-socket",
        document.getElementById("user-id-socket").textContent
    );
    document.getElementById("user-id-socket").remove();
});

// Whenever MQTT get new DBMS, if It going to be changed,
//  emit to user socket online
socket.on("emit-new-gps", (data) => {
    console.log(data);
    //  data.gpsID; ID of GPS, user for determine what is the GPS change
    Longitude.textContent = data.data[0];
    Latitude.textContent = data.data[1];

    if (marker) marker.setMap(null);
    marker = new google.maps.Marker({
        position: {
            lat: data.data[0],
            lng: data.data[1]
        },
        map,
        // icon:'../Client/DviceMain/gps64.png'
    });
});

// Whenever data change, MQTT, User change, ...,
// Server response to client new status of device
socket.on("update-status-GPS", (data) => {
    // id: ID of GPS, string type
    //State.textContent = data.status;
});