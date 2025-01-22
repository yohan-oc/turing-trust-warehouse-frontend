document.addEventListener('DOMContentLoaded', function() {
    const operators_name = document.getElementById('txtOperatorName');
    const operating_modes = document.getElementById('txtOperatingmodes');
    const parent_id = document.getElementById('txtParentID');
    const parent_response = document.getElementById('txtParentResponse');
    const asset_id = document.getElementById('txtAssetID');
    const transaction_table = document.getElementById('transaction');
    const endSession = document.getElementById('btnEndSession');
    const inventory_count = document.getElementById('txtInventoryCount');
    const btn_retry = document.getElementById('btnRetry');
    let currentState = document.getElementById('txtCurrentState');
    let isAssetScanState = false;
    let force_button;
    let selected_forced_assetID;
    let transaction_row;

    // Fetch operating modes on page load
    fetchOperatingModes();

    // Event listeners
    operators_name.addEventListener('keyup', function(e) {
        if (e.key === 'Enter' || e.key === 'Tab') {
            operating_modes.focus();
            operating_modes.selectStart = 0;
            const value = operators_name.value;
            getOperatorName(value);
            operating_modes.disabled = false;
        }
    });

    parent_id.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') e.preventDefault();
        if (e.key === 'Enter') getParentID(e);
    });

    asset_id.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') e.preventDefault();
        if (e.key === 'Enter') addAssetID(e);
    });

    endSession.addEventListener('click', resetSession);
    btn_retry.addEventListener('click', retryFailedAssets);

    operating_modes.addEventListener('change', getOperatingMode);

    // Functions
    function fetchOperatingModes() {
        fetch('/api/getmodes')
            .then(response => response.json())
            .then(data => {
                let output = '<option>--Select mode--</option>';
                data.forEach(mode => {
                    output += `<option>${mode}</option>`;
                });
                operating_modes.innerHTML = output;
            })
            .catch(error => console.error('Error fetching operating modes:', error));
    }

    function getOperatorName(value) {
        fetch(`/api/getOperatorMode?name=${value}`)
            .then(response => response.json())
            .then(data => {
                // Handle response
            })
            .catch(error => console.error('Error fetching operator mode:', error));
    }

    function getOperatingMode(e) {
        const value = e.target.value;
        fetch(`/api/getOperatingMode?mode=${value}`)
            .then(response => response.json())
            .then(data => {
                if (value !== "--Select mode--") {
                    parent_id.disabled = false;
                    parent_id.focus();
                    parent_id.selectStart = 0;
                } else {
                    parent_id.disabled = true;
                }
            })
            .catch(error => console.error('Error fetching operating mode:', error));
    }

    function getParentID(e) {
        const value = e.target.value;
        fetch(`/api/getParentId?id=${value}`)
            .then(response => response.json())
            .then(data => {
                if (data.response === 'OK') {
                    parent_response.value = "OK";
                    parent_response.style.backgroundColor = 'lime';
                    asset_id.disabled = false;
                    asset_id.focus();
                    isAssetScanState = true;
                } else {
                    parent_response.value = data.message;
                    parent_response.style.backgroundColor = 'red';
                }
            })
            .catch(error => console.error('Error fetching parent ID:', error));
    }

    function addAssetID(e) {
        const value = e.target.value;
        fetch(`/api/getAssetID?id=${value}`)
            .then(response => response.json())
            .then(data => {
                // Handle response
                asset_id.value = "";
            })
            .catch(error => console.error('Error fetching asset ID:', error));
    }

    function resetSession() {
        currentState.value = "";
        isAssetScanState = false;
        operators_name.disabled = false;
        operators_name.value = "";
        parent_id.value = "";
        parent_id.disabled = true;
        asset_id.value = "";
        asset_id.disabled = true;
        parent_response.value = "";
        parent_response.style.display = "none";
        inventory_count.value = "";
        operators_name.focus();
        operators_name.selectStart = 0;

        // Clear tables
        clearTable('inventory');
        clearTable('transaction');
        operating_modes.selectedIndex = 0;
    }

    function clearTable(tableId) {
        const table = document.getElementById(tableId);
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }
    }

    function retryFailedAssets() {
        if (isAssetScanState) {
            const rows = transaction_table.rows;
            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                if (row.cells[3].textContent.startsWith("Error")) {
                    const reference = row.cells[0].textContent;
                    const assetID = row.cells[1].textContent;
                    fetch(`/api/retryAssetScan`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ reference, asset: assetID })
                    })
                    .then(response => response.json())
                    .then(data => {
                        // Handle response
                    })
                    .catch(error => console.error('Error retrying asset scan:', error));
                }
            }
        }
    }
});
