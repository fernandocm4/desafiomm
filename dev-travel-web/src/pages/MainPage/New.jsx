import React, { useContext, useState } from "react";

import { AuthContext } from "../../contexts/auth";



const New = ({ onNewTravel, origins }) => {
    const { user } = useContext(AuthContext);
    const [newTravel, setNewTravel] = useState("");



    /*const fetchAutocomplete = async (input) =>{
        const response = await fetch('/autocomplete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input }),
        });

        return await response.json();

    }




    function createAutocomplete(inputId) {
        const input = document.getElementById(inputId);
        const autocompleteList = document.createElement('div');
        autocompleteList.id = `${inputId}-autocomplete-list`;
        input.parentNode.appendChild(autocompleteList);

        input.addEventListener('input', async function () {
            const value = this.value;
            if (!value) {
                autocompleteList.innerHTML = '';
                return;
            }

            const predictions = await fetchAutocomplete(value);
            autocompleteList.innerHTML = '';

            predictions.forEach(prediction => {
                const item = document.createElement('div');
                item.classList.add('autocomplete-item');
                item.textContent = prediction.description;
                item.addEventListener('click', () => {
                    input.value = prediction.description;
                    autocompleteList.innerHTML = '';
                });

                autocompleteList.appendChild(item);
            });
        });
    }*/




    return (


        
        <div className="new">
            <label htmlFor="new-travel">Novo destino</label>
            <input
                type="text"
                name="new-travel"
                id="new-travel"
                value={newTravel}
                onChange={(e) => setNewTravel(e.target.value)} />
            <button onClick={() => onNewTravel(newTravel)}>Adicionar</button>
        </div>





    )
}

export default New;