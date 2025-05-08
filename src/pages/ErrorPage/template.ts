const template = `
<main class="content content_type_error"> 
    <div class="error">
      <h2 class="error__title">
          {{errorCode}}
      </h2>
      <h3 class="error__subtitle">
          {{errorMessage}}
      </h3>
      <a href="navigate" data-ref="navigate" class="error__link">Назад к чатам</a>
    </div>  
</main>
`;
export default template;