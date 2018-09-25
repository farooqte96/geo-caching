// create ajax request using jquery

$(document).ready(function(){
  //grab delete cloudlet Class
  $('.delete-item').on('click', function(e){
      //e is event variable
    //to grab data attribute i.e data-id we use e.target
    $target=$(e.target);
    const id=$target.attr('item-id');
    //make ajax request
    $.ajax({
      type:'DELETE',
      url:'/item/'+id,
      success: function(response){
        alert('Deleting Item');
        //redirect it to main page using window.location attribute
        window.location.href='/';
      },
      error: function(error){
        console.log(error);
      }
    });
  });
});
