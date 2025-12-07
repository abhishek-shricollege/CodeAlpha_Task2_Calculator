(function(){
  const display = document.getElementById('display');
  const keys = document.querySelectorAll('.key');
  let expression = ''; // poora input string
  let resetNext = false;

  function updateDisplay(){
    display.textContent = expression || '0';
  }

  function appendNumber(num){
    if(resetNext){
      expression = '';
      resetNext = false;
    }
    expression += num;
    updateDisplay();
  }

  function appendOperator(op){
    if(resetNext) resetNext = false;

    // last character operator ho to replace
    if(expression.slice(-1).match(/[\+\-\*\/]/)){
      expression = expression.slice(0,-1) + op;
    } else {
      expression += op;
    }
    updateDisplay();
  }

  function clearAll(){
    expression = '';
    updateDisplay();
  }

  function backspace(){
    expression = expression.slice(0,-1);
    updateDisplay();
  }

  function percent(){
    try{
      let val = eval(expression);
      val = val / 100;
      expression = String(val);
      resetNext = true;
      updateDisplay();
    } catch(e){
      expression = 'Error';
      resetNext = true;
      updateDisplay();
    }
  }

  function calculate(){
    try{
      let val = eval(expression);
      expression = String(val);
      resetNext = true;
      updateDisplay();
    } catch(e){
      expression = 'Error';
      resetNext = true;
      updateDisplay();
    }
  }

  // Click handlers
  keys.forEach(key => {
    key.addEventListener('click', () => {
      const num = key.dataset.num;
      const action = key.dataset.action;

      if(num !== undefined){ appendNumber(num); return; }
      if(action === 'clear'){ clearAll(); return; }
      if(action === 'back'){ backspace(); return; }
      if(action === 'percent'){ percent(); return; }
      if(action === '='){ calculate(); return; }
      if(['+','-','*','/'].includes(action)){ appendOperator(action); return; }
    });
  });

  // Keyboard support
  window.addEventListener('keydown', (e) => {
    if(e.key >= '0' && e.key <= '9') { appendNumber(e.key); e.preventDefault(); }
    else if(e.key === '.') { appendNumber('.'); e.preventDefault(); }
    else if(e.key === 'Enter' || e.key === '=') { calculate(); e.preventDefault(); }
    else if(e.key === 'Backspace') { backspace(); e.preventDefault(); }
    else if(e.key === 'Escape') { clearAll(); e.preventDefault(); }
    else if(['+','-','*','/'].includes(e.key)){ appendOperator(e.key); e.preventDefault(); }
    else if(e.key === '%'){ percent(); e.preventDefault(); }
  });

  updateDisplay();
})();
