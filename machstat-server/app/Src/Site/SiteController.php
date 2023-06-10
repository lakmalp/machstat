<?php

namespace App\Src\Site;

use App\Http\Controllers\Controller;
use App\Src\Company\Company;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class SiteController extends Controller
{
    private $validator;

    private $repository;
    function __construct(SiteValidator $validator, SiteRepository $repository)
    {
        $this->validator = $validator;
        $this->repository = $repository;
    }

    public function index(Request $request): JsonResponse
    {
        $per_page = $request->input('pageSize') ?? 10;

        $current_page = $request->input('pageNo') ?? 1;

        $starting_point = $per_page * ($current_page - 1);

        $total = Site::get()->count();

        $data = Site::orderBy('created_at', 'ASC')
            ->with(['company'])
            ->take($per_page)
            ->skip($starting_point)
            ->get()
            ->toArray();  

        $array= new Paginator($data, $per_page, $current_page);

        $params = collect([
            'companies' => Company::get(), 
            'total' => $total,
            'count' => $array->count(),
            'is_last_page' => (($array->count() < $per_page) || (($current_page - 1) * $per_page) + $array->count() == $total)
        ]);

        $ret = $params->merge($array);

        return response()->json($ret);
    }

    public function create(Request $request): JsonResponse
    {
        $companies = Company::get();
        $site = new Site;
        
        return response()->json(['companies' => $companies, 'data' => $site]);
    }

    public function store(Request $request): JsonResponse
    {
        abort_if($request->user()->cannot('create-site', Site::class), 403);

        $validated = $this->validator->validateCreate($request);

        $site = $this->repository->createSite($validated);

        // SendOrderToVendor::dispatch($order)->onQueue('orders');

        // NewOrderPlaced::dispatch($order);
        
        return response()->json(['data' => $site]);
    }

    public function edit(Site $site): JsonResponse
    {
        return response()->json([
            'data' => $site
        ]);
    }

    public function update(Request $request, Site $site): JsonResponse
    {
        abort_if($request->user()->cannot('edit-site', Site::class), 403);

        $validated = $this->validator->validateUpdate($request);

        $site = $this->repository->updateSite($site, $validated);

        // SendOrderToVendor::dispatch($order)->onQueue('orders');

        // NewOrderPlaced::dispatch($order);
        
        return response()->json(['data' => $site]);
    }

    public function delete(Site $site): bool
    {
        return $site->delete();
    }
    public function deleteBatch(Request $request): JsonResponse
    {
        Site::destroy($request->all());
        return response()->json([]);
    }
}
